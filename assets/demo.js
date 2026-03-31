const STORAGE_KEY = "ai-research-demo-state-v3";

function loadState() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{"pages":{}}');
  } catch {
    return { pages: {} };
  }
}

const demoState = loadState();

function currentPage() {
  return document.body.dataset.page || "overview";
}

function pageState() {
  const page = currentPage();
  demoState.pages ||= {};
  demoState.pages[page] ||= {};
  return demoState.pages[page];
}

function saveState() {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(demoState));
}

function q(selector, root = document) {
  return root.querySelector(selector);
}

function qa(selector, root = document) {
  return [...root.querySelectorAll(selector)];
}

function textOf(node) {
  return (node?.textContent || "").replace(/\s+/g, " ").trim();
}

function hostNode() {
  return q(".proto-app") || q(".demo-body") || q(".page");
}

function ensureStatus() {
  const host = hostNode();
  if (!host) return null;

  let status = q(".demo-status", host);
  if (!status) {
    status = document.createElement("div");
    status.className = "demo-status";
    status.innerHTML = "<strong>当前状态</strong><span>页面里的卡片、标签、内容块都可以点击，支持双击编辑的位置也已经开启。</span>";
    const anchor = q(".proto-topbar", host) || host.firstElementChild;
    if (anchor) {
      anchor.insertAdjacentElement("afterend", status);
    } else {
      host.prepend(status);
    }
  }
  return status;
}

function setStatus(title, message, tone = "") {
  const status = ensureStatus();
  if (!status) return;
  status.className = `demo-status ${tone}`.trim();
  status.innerHTML = `<strong>${title}</strong><span>${message}</span>`;
}

function markSingle(nodes, activeNode, className = "is-selected") {
  nodes.forEach((node) => node.classList.toggle(className, node === activeNode));
}

function makeDownload(filename, content, type = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function copyText(content) {
  try {
    await navigator.clipboard.writeText(content);
    return true;
  } catch {
    const input = document.createElement("textarea");
    input.value = content;
    document.body.appendChild(input);
    input.select();
    const ok = document.execCommand("copy");
    input.remove();
    return ok;
  }
}

function navigateTo(url, title, message) {
  setStatus(title, message, "success");
  window.setTimeout(() => {
    window.location.href = url;
  }, 220);
}

function setInteractive(node) {
  if (!node) return;
  node.classList.add("is-clickable");
  if (!/^(A|BUTTON|INPUT|TEXTAREA|SELECT)$/.test(node.tagName)) {
    if (!node.hasAttribute("tabindex")) node.tabIndex = 0;
    if (!node.hasAttribute("role")) node.setAttribute("role", "button");
  }
}

function bindPress(node, handler) {
  if (!node || node.dataset.pressBound === "true") return;
  node.dataset.pressBound = "true";
  setInteractive(node);

  const wrapped = (event) => {
    if (event.type === "keydown" && !["Enter", " "].includes(event.key)) return;
    if (event.type === "keydown") event.preventDefault();
    handler(event);
  };

  node.addEventListener("click", wrapped);
  node.addEventListener("keydown", wrapped);
}

function actionElements() {
  return qa(".btn, .proto-action");
}

function bindAction(label, handler) {
  actionElements()
    .filter((node) => textOf(node) === label)
    .forEach((node) => {
      if (node.dataset.actionBound === label) return;
      node.dataset.actionBound = label;
      bindPress(node, handler);
    });
}

function ensureEdits() {
  const state = pageState();
  state.edits ||= {};
  return state.edits;
}

function selectAllText(node) {
  const range = document.createRange();
  range.selectNodeContents(node);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

function startInlineEdit(node, multiline) {
  if (!node || node.isContentEditable) return;
  node.dataset.previousText = node.textContent || "";
  node.contentEditable = "true";
  node.spellcheck = false;
  node.classList.add("is-live-edit");
  node.focus();
  selectAllText(node);
  setStatus(
    "进入编辑",
    `正在编辑${node.dataset.editLabel || "当前内容"}，${multiline ? "按 Ctrl+Enter 或失焦保存。" : "按 Enter 或失焦保存。"}`,
    "active"
  );
}

function finishInlineEdit(node, save) {
  if (!node?.isContentEditable) return;

  const previousText = node.dataset.previousText || "";
  const nextText = textOf(node) || previousText;

  node.contentEditable = "false";
  node.classList.remove("is-live-edit");

  if (!save) {
    node.textContent = previousText;
    setStatus("已取消编辑", `${node.dataset.editLabel || "当前内容"}保持原样。`);
    return;
  }

  node.textContent = nextText;
  ensureEdits()[node.dataset.editKey] = nextText;
  saveState();
  setStatus("内容已更新", `${node.dataset.editLabel || "当前内容"}已保存。`, "success");
}

function bindInlineEditors(nodes, { prefix, label, multiline = false }) {
  const edits = ensureEdits();

  nodes.forEach((node, index) => {
    if (!node) return;

    const key = `${prefix}-${index}`;
    if (edits[key]) node.textContent = edits[key];
    node.dataset.editKey = key;
    node.dataset.editLabel = nodes.length === 1 ? label : `${label}${index + 1}`;
    node.classList.add("is-editable");
    setInteractive(node);

    if (node.dataset.editorBound === "true") return;
    node.dataset.editorBound = "true";

    node.addEventListener("dblclick", (event) => {
      event.preventDefault();
      startInlineEdit(node, multiline);
    });

    node.addEventListener("blur", () => {
      finishInlineEdit(node, true);
    }, true);

    node.addEventListener("keydown", (event) => {
      if (!node.isContentEditable) return;

      if (event.key === "Escape") {
        event.preventDefault();
        finishInlineEdit(node, false);
        return;
      }

      if (!multiline && event.key === "Enter") {
        event.preventDefault();
        node.blur();
      }

      if (multiline && event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        node.blur();
      }
    });
  });
}

function bindSharedElements() {
  qa(".proto-note").forEach((node) => {
    bindPress(node, (event) => {
      event.preventDefault();
      node.classList.toggle("is-selected");
      setStatus("说明卡已聚焦", textOf(node).slice(0, 48), "active");
    });
  });

  qa(".proto-banner").forEach((node) => {
    bindPress(node, (event) => {
      event.preventDefault();
      node.classList.toggle("is-selected");
      setStatus("主题卡已聚焦", textOf(q("h3", node) || node), "active");
    });
  });

  qa(".proto-badge, .proto-badge-ghost").forEach((node) => {
    bindPress(node, (event) => {
      event.preventDefault();
      setStatus("流程状态", `${textOf(node)} 已被查看。`, "active");
    });
  });

  qa(".proto-overview-card").forEach((node) => {
    bindPress(node, (event) => {
      event.preventDefault();
      const href = node.getAttribute("href");
      const title = textOf(q("h3", node) || node);
      if (href) {
        navigateTo(href, "进入页面", `正在打开 ${title}。`);
      } else {
        setStatus("总览卡已聚焦", title, "active");
      }
    });
  });
}

function bindOverview() {
  const cards = qa(".proto-overview-card");
  if (!cards.length) return;

  cards.forEach((card) => {
    bindPress(card, (event) => {
      event.preventDefault();
      const href = card.getAttribute("href");
      const title = textOf(q("h3", card) || card);
      if (href) {
        navigateTo(href, "进入页面", `正在打开 ${title}。`);
      } else {
        setStatus("总览卡已聚焦", title, "active");
      }
    });
  });
}

function bindHome() {
  const state = pageState();
  const question = q(".proto-textarea");
  const scenes = qa(".proto-pill");
  const templates = qa(".proto-template-card");
  const uploadCards = qa(".proto-upload-card");
  const note = q(".proto-note");

  const templatePrompts = {
    文献综述模板: "例如：围绕欧盟碳边境调节机制，整理其影响制造业出口的核心研究结论、分歧观点与研究空白。",
    政策解读模板: "例如：欧盟碳边境调节机制将如何影响中国制造业出口？请按政策条款、影响路径和应对建议展开。",
    回归结果解释模板: "例如：数字化转型是否显著提升企业绿色创新产出？请解释系数方向、显著性和机制含义。",
    企业策略建议模板: "例如：某高碳制造企业应如何应对 CBAM 带来的出口压力？请给出分阶段行动建议。"
  };

  const sceneToTemplate = {
    文献综述: "文献综述模板",
    政策分析: "政策解读模板",
    "ESG/行业研究": "企业策略建议模板",
    数据结果解释: "回归结果解释模板",
    报告生成: "企业策略建议模板"
  };

  const scenePrompts = {
    文献综述: "例如：围绕 CBAM 对中国制造业出口的影响，整理已有研究的共识、争议与研究空白。",
    政策分析: "例如：欧盟碳边境调节机制将如何影响中国制造业出口？请按条款、行业、影响路径和建议分析。",
    "ESG/行业研究": "例如：高碳制造企业在出口压力上升背景下，应如何调整减排投入、客户结构和合规节奏？",
    数据结果解释: "例如：绿色创新补贴是否显著提高企业出口韧性？请解释结果方向、显著性与机制。",
    报告生成: "例如：请将 CBAM 对制造业出口的影响整理成一份可汇报的结论摘要与行动建议。"
  };

  function savePrompt(value) {
    if (!question) return;
    question.textContent = value;
    ensureEdits()["prompt-0"] = value;
    state.prompt = value;
    saveState();
  }

  function uploadBody(card) {
    return q("span:last-child", card) || q("span", card);
  }

  function renderUploads() {
    uploadCards.forEach((card) => {
      const title = textOf(q("strong", card));
      const body = uploadBody(card);
      if (!body) return;
      body.dataset.defaultText ||= body.textContent;
      body.textContent = body.dataset.defaultText;
      card.classList.remove("is-selected", "is-saved");

      if (title.includes("PDF") && state.pdfCount) {
        body.textContent = `已导入 ${state.pdfCount} 份 PDF，点击可重新上传`;
        card.classList.add("is-selected", "is-saved");
      }

      if (title.includes("Word") && state.wordCount) {
        body.textContent = `已导入 ${state.wordCount} 份文档，点击可重新上传`;
        card.classList.add("is-selected", "is-saved");
      }

      if (title.includes("网页链接") && state.webUrl) {
        body.textContent = `已导入链接：${state.webUrl}`;
        card.classList.add("is-selected", "is-saved");
      }
    });
  }

  function selectTemplate(card) {
    if (!card) return;
    markSingle(templates, card);
    const name = textOf(q("strong", card));
    state.template = name;
    saveState();

    if (templatePrompts[name]) savePrompt(templatePrompts[name]);
    setStatus("模板已套用", `当前模板：${name}`, "success");
  }

  function selectScene(card) {
    if (!card) return;
    markSingle(scenes, card);
    const name = textOf(card);
    state.scene = name;
    saveState();

    if (scenePrompts[name]) savePrompt(scenePrompts[name]);

    const mappedTemplate = sceneToTemplate[name];
    if (mappedTemplate) {
      const target = templates.find((item) => textOf(q("strong", item)) === mappedTemplate);
      if (target) selectTemplate(target);
    }

    setStatus("任务场景已切换", `当前场景：${name}`, "active");
  }

  bindInlineEditors([question], {
    prefix: "prompt",
    label: "研究问题",
    multiline: true
  });

  scenes.forEach((pill) => {
    bindPress(pill, (event) => {
      event.preventDefault();
      selectScene(pill);
    });
  });

  templates.forEach((card) => {
    bindPress(card, (event) => {
      event.preventDefault();
      selectTemplate(card);
    });
  });

  uploadCards.forEach((card) => {
    bindPress(card, (event) => {
      event.preventDefault();
      const title = textOf(q("strong", card));

      if (title.includes("网页链接")) {
        const url = window.prompt("请输入网页链接", state.webUrl || "https://");
        if (!url) {
          setStatus("已取消导入", "还没有新增网页链接。");
          return;
        }
        state.webUrl = url;
        saveState();
        renderUploads();
        setStatus("网页资料已导入", url, "success");
        return;
      }

      const picker = document.createElement("input");
      picker.type = "file";
      picker.multiple = true;
      picker.accept = title.includes("PDF") ? ".pdf" : ".doc,.docx,.txt,.md";

      picker.addEventListener("change", () => {
        const count = picker.files?.length || 0;
        if (!count) {
          setStatus("未选择文件", "可以稍后继续补充资料。");
          return;
        }

        if (title.includes("PDF")) state.pdfCount = count;
        if (title.includes("Word")) state.wordCount = count;
        saveState();
        renderUploads();
        setStatus("资料已导入", `${title} 已补充 ${count} 份。`, "success");
      });

      picker.click();
    });
  });

  if (note) {
    bindPress(note, (event) => {
      event.preventDefault();
      note.classList.toggle("is-selected");
      setStatus("模板说明已展开", "双击问题输入区可以直接改写问题表述。", "active");
    });
  }

  renderUploads();

  if (state.prompt) savePrompt(state.prompt);
  if (state.scene) {
    const activeScene = scenes.find((pill) => textOf(pill) === state.scene);
    if (activeScene) markSingle(scenes, activeScene);
  } else if (scenes[0]) {
    markSingle(scenes, scenes[0]);
  }

  if (state.template) {
    const activeTemplate = templates.find((card) => textOf(q("strong", card)) === state.template);
    if (activeTemplate) markSingle(templates, activeTemplate);
  } else if (templates[0]) {
    markSingle(templates, templates[0]);
  }

  bindAction("开始分析", (event) => {
    event.preventDefault();
    state.prompt = textOf(question);
    saveState();
    navigateTo("decompose.html", "任务已创建", `已按“${state.scene || "默认场景"}”启动分析。`);
  });

  bindAction("使用模板", (event) => {
    event.preventDefault();
    const current = templates.find((card) => card.classList.contains("is-selected")) || templates[0];
    selectTemplate(current);
  });

  bindAction("上传资料", (event) => {
    event.preventDefault();
    uploadCards[0]?.click();
  });
}

function bindDecompose() {
  const state = pageState();
  const bannerTitle = q(".proto-banner h3");
  const taskCards = qa(".proto-task-card");
  const taskTexts = taskCards.map((card) => q("span", card));
  const sourceCards = qa(".proto-source-item");
  const note = q(".proto-note");
  let editMode = Boolean(state.editMode);

  bindInlineEditors([bannerTitle], {
    prefix: "topic",
    label: "原始问题"
  });

  bindInlineEditors(taskTexts, {
    prefix: "task",
    label: "子任务说明",
    multiline: true
  });

  function selectedSources() {
    return sourceCards
      .filter((card) => card.classList.contains("is-selected"))
      .map((card) => textOf(q("strong", card)));
  }

  function selectTask(card) {
    if (!card) return;
    markSingle(taskCards, card);
    state.activeTask = textOf(q("span", card));
    saveState();
    setStatus("子任务已定位", state.activeTask, "active");
  }

  function renderEditMode() {
    taskCards.forEach((card) => card.classList.toggle("is-editing", editMode));
  }

  function saveTasks() {
    state.tasks = taskTexts.map((node) => textOf(node));
    state.selectedSources = selectedSources();
    saveState();
    taskCards.forEach((card) => card.classList.add("is-saved"));
    setStatus("任务链路已保存", `已保存 ${taskTexts.length} 个子任务与 ${state.selectedSources.length} 个资料来源。`, "success");
  }

  taskCards.forEach((card, index) => {
    if (state.tasks?.[index]) taskTexts[index].textContent = state.tasks[index];
    bindPress(card, (event) => {
      event.preventDefault();
      selectTask(card);
    });
  });

  sourceCards.forEach((card) => {
    if (state.selectedSources?.includes(textOf(q("strong", card)))) {
      card.classList.add("is-selected");
    }

    bindPress(card, (event) => {
      event.preventDefault();
      card.classList.toggle("is-selected");
      state.selectedSources = selectedSources();
      saveState();
      const name = textOf(q("strong", card));
      const title = card.classList.contains("is-selected") ? "资料来源已纳入" : "资料来源已移出";
      setStatus(title, name, card.classList.contains("is-selected") ? "success" : "");
    });
  });

  if (note) {
    bindPress(note, (event) => {
      event.preventDefault();
      note.classList.toggle("is-selected");
      setStatus("推荐流程已聚焦", "你可以先选资料来源，再逐条调整子任务。", "active");
    });
  }

  renderEditMode();

  if (state.activeTask) {
    const activeTask = taskCards.find((card) => textOf(q("span", card)) === state.activeTask);
    if (activeTask) markSingle(taskCards, activeTask);
  } else if (taskCards[0]) {
    markSingle(taskCards, taskCards[0]);
  }

  bindAction("编辑拆解结果", (event) => {
    event.preventDefault();
    editMode = !editMode;
    state.editMode = editMode;
    saveState();
    renderEditMode();

    const activeCard = taskCards.find((card) => card.classList.contains("is-selected")) || taskCards[0];
    const activeText = taskTexts[taskCards.indexOf(activeCard)];

    if (editMode && activeText) {
      selectTask(activeCard);
      startInlineEdit(activeText, true);
    }

    setStatus(
      editMode ? "拆解结果可编辑" : "已退出编辑",
      editMode ? "双击任意子任务也可以继续修改。" : "当前任务链路保持现状。",
      editMode ? "active" : ""
    );
  });

  bindAction("保存任务链路", (event) => {
    event.preventDefault();
    saveTasks();
  });

  bindAction("继续检索资料", (event) => {
    event.preventDefault();
    if (!sourceCards.some((card) => card.classList.contains("is-selected"))) {
      sourceCards.forEach((card) => card.classList.add("is-selected"));
      state.selectedSources = selectedSources();
      saveState();
    }
    saveTasks();
    navigateTo("parse.html", "任务链路已确认", "正在进入文档解析页。");
  });
}

function bindParse() {
  const state = pageState();
  const toolTags = qa(".proto-document-toolbar .proto-tag");
  const highlightLines = qa(".proto-highlight-line");
  const quote = q(".proto-document-quote");
  const summaryCards = qa(".proto-summary-card");
  const summaryBodies = summaryCards.map((card) => q("p", card));
  const pointItems = qa(".proto-list-item");
  const pointTexts = pointItems.map((item) => q("strong", item));
  const citationTags = qa(".proto-inline-tags .proto-tag");
  const resultPanel = q(".proto-result-panel");

  const docStates = [
    {
      quote: "“企业需要在过渡期先建立排放数据核算和申报能力。”",
      short: "CBAM 在过渡期先要求企业完成排放申报与核算准备，短期重点是补齐合规能力。",
      long: "文件显示，CBAM 在过渡期优先要求企业建立排放数据核算、申报和披露能力，正式征收阶段才逐步引入补缴机制。因此，企业短期应先补内部数据台账、核算口径和申报流程，中期再应对成本传导与客户议价问题。",
      points: [
        "核心观点：过渡期的关键不是立刻缴税，而是先具备可核验的排放申报能力。",
        "关键变量 / 指标：排放核算口径、申报频率、产品类别、客户披露要求。",
        "研究方法 / 政策条款：过渡期申报、正式补缴、核算规则。",
        "时间节点：过渡期、正式执行期、行业范围扩展期。"
      ],
      citations: ["第 3 页第 2 段", "第 5 页图表 1"]
    },
    {
      quote: "“高碳行业在正式征收阶段将面临更明显的成本抬升与客户筛选压力。”",
      short: "高碳行业在正式征收期会同时承受成本抬升和客户筛选压力，出口结构会更早分化。",
      long: "材料表明，CBAM 的直接影响并不平均分布在所有行业，而是更集中落在钢铁、铝、水泥、化肥等高碳行业。正式征收后，企业不仅面对成本抬升，还要面对客户对排放披露、供应链透明度和减碳路径的筛选，因此出口结构与客户结构都会更早出现分化。",
      points: [
        "核心观点：高碳行业的影响更集中，客户筛选和合规要求会同步升级。",
        "关键变量 / 指标：行业碳强度、客户结构、成本转嫁能力、出口产品组合。",
        "研究方法 / 政策条款：行业范围、申报规则、正式征收阶段。",
        "时间节点：正式征收前准备期、执行期、客户重筛阶段。"
      ],
      citations: ["第 6 页第 1 段", "附录 A 表 2"]
    }
  ];

  function activeDocIndex() {
    return Number(state.activeDocIndex ?? 0);
  }

  function activeSummaryCard() {
    return summaryCards.find((card) => card.classList.contains("is-selected")) || summaryCards[0];
  }

  function applyDocState(index) {
    const nextIndex = Math.max(0, Math.min(index, docStates.length - 1));
    const data = docStates[nextIndex];
    state.activeDocIndex = nextIndex;
    saveState();

    markSingle(highlightLines, highlightLines[nextIndex]);
    quote.textContent = data.quote;
    ensureEdits()["quote-0"] = data.quote;
    citationTags.forEach((tag, i) => {
      tag.textContent = data.citations[i] || `引用 ${i + 1}`;
    });
    saveState();
    setStatus("高亮段落已切换", data.quote, "active");
  }

  function selectSummary(card) {
    if (!card) return;
    markSingle(summaryCards, card);
    state.activeSummary = textOf(q("strong", card));
    saveState();
    setStatus("摘要版本已选中", state.activeSummary, "active");
  }

  bindInlineEditors([quote], {
    prefix: "quote",
    label: "引用原文",
    multiline: true
  });

  bindInlineEditors(summaryBodies, {
    prefix: "summary",
    label: "摘要内容",
    multiline: true
  });

  bindInlineEditors(pointTexts, {
    prefix: "point",
    label: "关键信息",
    multiline: true
  });

  toolTags.forEach((tag) => {
    bindPress(tag, (event) => {
      event.preventDefault();
      markSingle(toolTags, tag);
      const label = textOf(tag);

      if (label.includes("高亮")) {
        applyDocState(activeDocIndex());
        return;
      }

      if (label.includes("选中文字提问")) {
        const question = window.prompt("请输入你想追问的问题", state.docQuestion || "这段条款对企业意味着什么？");
        if (!question) {
          setStatus("已取消追问", "还没有新增问题。");
          return;
        }
        state.docQuestion = question;
        saveState();
        setStatus("追问已记录", question, "success");
        return;
      }

      setStatus("文档工具已切换", label, "active");
    });
  });

  highlightLines.forEach((line, index) => {
    bindPress(line, (event) => {
      event.preventDefault();
      applyDocState(index);
    });
  });

  summaryCards.forEach((card) => {
    bindPress(card, (event) => {
      event.preventDefault();
      selectSummary(card);
    });
  });

  pointItems.forEach((item) => {
    bindPress(item, (event) => {
      event.preventDefault();
      item.classList.toggle("is-selected");
      state.selectedPoints = pointItems
        .filter((card) => card.classList.contains("is-selected"))
        .map((card) => textOf(q("strong", card)));
      saveState();
      setStatus(
        item.classList.contains("is-selected") ? "观点已纳入" : "观点已移出",
        textOf(q("strong", item)),
        item.classList.contains("is-selected") ? "success" : ""
      );
    });
  });

  citationTags.forEach((tag) => {
    bindPress(tag, (event) => {
      event.preventDefault();
      markSingle(citationTags, tag);
      state.activeCitation = textOf(tag);
      saveState();
      setStatus("引用位置已定位", state.activeCitation, "active");
    });
  });

  applyDocState(activeDocIndex());

  if (state.activeSummary) {
    const activeCard = summaryCards.find((card) => textOf(q("strong", card)) === state.activeSummary);
    if (activeCard) markSingle(summaryCards, activeCard);
  } else if (summaryCards[0]) {
    markSingle(summaryCards, summaryCards[0]);
  }

  if (state.selectedPoints?.length) {
    pointItems.forEach((item) => {
      if (state.selectedPoints.includes(textOf(q("strong", item)))) {
        item.classList.add("is-selected");
      }
    });
  }

  bindAction("生成摘要", (event) => {
    event.preventDefault();
    const data = docStates[activeDocIndex()];
    summaryBodies[0].textContent = data.short;
    summaryBodies[1].textContent = data.long;
    ensureEdits()["summary-0"] = data.short;
    ensureEdits()["summary-1"] = data.long;
    saveState();
    selectSummary(activeSummaryCard());
    setStatus("摘要已生成", "已根据当前高亮段落刷新 100 字和 300 字摘要。", "success");
  });

  bindAction("提取关键观点", (event) => {
    event.preventDefault();
    const data = docStates[activeDocIndex()];
    pointTexts.forEach((node, index) => {
      if (!data.points[index]) return;
      node.textContent = data.points[index];
      ensureEdits()[`point-${index}`] = data.points[index];
    });
    pointItems.forEach((item) => item.classList.add("is-selected"));
    state.selectedPoints = data.points.slice();
    saveState();
    setStatus("关键信息已提取", `已更新 ${data.points.length} 条要点。`, "success");
  });

  bindAction("加入知识库", (event) => {
    event.preventDefault();
    resultPanel?.classList.add("is-saved");
    state.knowledgeSaved = true;
    saveState();
    setStatus("已加入知识库", "当前文档的摘要、观点与引用位置已沉淀。", "success");
  });

  bindAction("对比其他文档", (event) => {
    event.preventDefault();
    navigateTo("synthesis.html", "准备跨文档对比", "正在进入分析归纳页。");
  });
}

function bindSynthesis() {
  const state = pageState();
  const bannerTitle = q(".proto-banner h3");
  const dataRows = qa(".proto-table-row").filter((row) => !row.classList.contains("header"));
  const tableCells = qa(".proto-table-row:not(.header) span");
  const frameworkSteps = qa(".proto-framework-step");
  const insightCards = qa(".proto-synthesis-grid .proto-list-item");
  const insightTexts = insightCards.map((card) => q("strong", card));
  const synthesisPanel = q(".proto-synthesis-panel");

  bindInlineEditors([bannerTitle], {
    prefix: "topic",
    label: "分析主题"
  });

  bindInlineEditors(insightTexts, {
    prefix: "insight",
    label: "归纳结论",
    multiline: true
  });

  function selectRow(row, activeCell = null) {
    if (!row) return;
    markSingle(dataRows, row);
    tableCells.forEach((cell) => cell.classList.toggle("is-selected", cell === activeCell));

    const rowIndex = dataRows.indexOf(row);
    const step = frameworkSteps[Math.min(rowIndex, frameworkSteps.length - 1)];
    const insight = insightCards[rowIndex] || insightCards[0];

    if (step) markSingle(frameworkSteps, step);
    if (insight) markSingle(insightCards, insight);

    state.activeRow = rowIndex;
    saveState();
    setStatus("对比行已聚焦", textOf(q("span", row)), "active");
  }

  function bindOutlineInteractions() {
    const outlineItems = qa(".proto-outline li", synthesisPanel);
    bindInlineEditors(outlineItems, {
      prefix: "outline",
      label: "提纲节点"
    });

    outlineItems.forEach((item) => {
      bindPress(item, (event) => {
        event.preventDefault();
        item.classList.toggle("is-selected");
        setStatus("提纲节点已选中", textOf(item), "active");
      });
    });
  }

  dataRows.forEach((row) => {
    bindPress(row, (event) => {
      if (event.target.closest("span")) return;
      event.preventDefault();
      selectRow(row);
    });
  });

  tableCells.forEach((cell) => {
    bindPress(cell, (event) => {
      event.preventDefault();
      selectRow(cell.closest(".proto-table-row"), cell);
      setStatus("对比字段已选中", textOf(cell), "active");
    });
  });

  frameworkSteps.forEach((step) => {
    bindPress(step, (event) => {
      event.preventDefault();
      markSingle(frameworkSteps, step);
      state.activeStep = textOf(q("strong", step) || step);
      saveState();
      setStatus("框架步骤已聚焦", state.activeStep, "active");
    });
  });

  insightCards.forEach((card) => {
    bindPress(card, (event) => {
      event.preventDefault();
      markSingle(insightCards, card);
      state.activeInsight = textOf(q("strong", card));
      saveState();
      setStatus("归纳结论已选中", state.activeInsight, "active");
    });
  });

  if (Number.isInteger(state.activeRow) && dataRows[state.activeRow]) {
    selectRow(dataRows[state.activeRow]);
  } else if (dataRows[0]) {
    selectRow(dataRows[0]);
  }

  bindAction("生成综述提纲", (event) => {
    event.preventDefault();

    let outline = q(".proto-outline", synthesisPanel);
    if (!outline) {
      outline = document.createElement("div");
      outline.className = "proto-outline";
      outline.innerHTML = `
        <strong>自动生成提纲</strong>
        <ul>
          <li>一、政策条款与执行节奏</li>
          <li>二、制造业出口的成本与合规影响</li>
          <li>三、行业差异与企业应对策略</li>
        </ul>
      `;
      synthesisPanel?.appendChild(outline);
    } else {
      const items = qa("li", outline);
      if (items[0] && dataRows[state.activeRow]) {
        items[0].textContent = `一、重点对比：${textOf(q("span", dataRows[state.activeRow]))}`;
      }
    }

    bindOutlineInteractions();
    setStatus("综述提纲已生成", "提纲节点已加入页面，并支持继续点击或双击编辑。", "success");
  });

  bindAction("输出政策分析框架", (event) => {
    event.preventDefault();
    frameworkSteps.forEach((step) => step.classList.add("is-selected"));
    setStatus("分析框架已展开", "政策变化到企业应对策略的路径已全部点亮。", "success");
  });

  bindAction("导出对比表", (event) => {
    event.preventDefault();
    const rows = qa(".proto-table-row").map((row) =>
      qa("span", row).map((cell) => `"${textOf(cell)}"`).join(",")
    );
    makeDownload("analysis-compare.csv", rows.join("\n"), "text/csv;charset=utf-8");
    setStatus("对比表已导出", "CSV 文件已生成。", "success");
  });
}

function bindOutput() {
  const state = pageState();
  const modeTabs = qa(".proto-mode");
  const outputCards = qa(".proto-output-card");
  const outputBodies = outputCards.map((card) => q("p", card));
  const outputTitles = outputCards.map((card) => q("strong", card));
  const settingCards = qa(".proto-setting-item");

  const settingsConfig = [
    { key: "tone", label: "语气风格", options: ["学术", "政策", "企业", "汇报"] },
    { key: "length", label: "字数长度", options: ["短版", "标准版", "长版"] },
    { key: "citationMode", label: "引用呈现", options: ["保留引用", "简化引用", "不显示引用"] },
    { key: "exportType", label: "导出格式", options: ["Word", "Markdown", "纯文本"] }
  ];

  const toneToMode = {
    学术: "学术综述版",
    政策: "政策简报版",
    企业: "企业建议版",
    汇报: "汇报摘要版"
  };

  const modeTemplates = {
    学术综述版: {
      core: "CBAM 将通过碳成本、核算合规和客户披露要求，推动中国制造业出口企业重构成本控制与供应链协同方式。",
      detail: "从政策条款、行业报告和学术研究交叉看，影响路径主要表现为成本抬升、合规投入增加与出口结构调整。",
      action: "建议后续围绕行业异质性、中小企业核算能力和成本传导弹性继续补充证据。"
    },
    政策简报版: {
      core: "CBAM 将显著提高高碳产品出口的合规门槛，政策影响将优先体现在重点行业。",
      detail: "短期压力集中在申报核算与披露，中期压力则转向成本补缴和客户筛选。",
      action: "优先建设企业碳核算体系，并推动重点行业形成配套支持。"
    },
    企业建议版: {
      core: "出口企业需要把碳合规能力前置到供应链管理中，尽早建立可核验的数据台账。",
      detail: "短期先补申报和披露能力，中期再推动产品与客户结构优化，减少高碳风险敞口。",
      action: "建议建立碳数据台账、识别重点客户要求，并制定分行业应对节奏。"
    },
    汇报摘要版: {
      core: "一句话结论：CBAM 将倒逼制造业出口企业升级碳管理能力。",
      detail: "三点判断：成本更高、合规更严、行业分化更明显。",
      action: "下一步动作：补数据、看行业、出策略。"
    }
  };

  function settingsState() {
    state.settings ||= {
      tone: "学术",
      length: "标准版",
      citationMode: "保留引用",
      exportType: "Markdown"
    };
    return state.settings;
  }

  function activeMode() {
    return textOf(modeTabs.find((tab) => tab.classList.contains("active")) || modeTabs[0]);
  }

  function trimByLength(text, length) {
    if (length === "短版") {
      const firstSentence = text.split("。").filter(Boolean)[0];
      return firstSentence ? `${firstSentence}。` : text;
    }
    if (length === "长版") {
      return `${text} 这里建议在正式交付前继续补充分行业案例、企业异质性与时间节奏。`;
    }
    return text;
  }

  function tonePrefix(tone, index) {
    const prefixMap = {
      学术: ["研究判断：", "分析表明：", "后续建议："],
      政策: ["核心结论：", "重点判断：", "政策建议："],
      企业: ["业务判断：", "经营影响：", "行动建议："],
      汇报: ["一句话结论：", "重点信息：", "下一步："]
    };
    return (prefixMap[tone] || prefixMap.学术)[index];
  }

  function citationSuffix(mode) {
    if (mode === "保留引用") return "（保留来源与定位）";
    if (mode === "简化引用") return "（保留核心出处）";
    return "";
  }

  function buildOutputTexts(mode) {
    const template = modeTemplates[mode] || modeTemplates["学术综述版"];
    const settings = settingsState();
    const suffix = citationSuffix(settings.citationMode);

    return [
      `${tonePrefix(settings.tone, 0)}${trimByLength(template.core, settings.length)}${suffix}`,
      `${tonePrefix(settings.tone, 1)}${trimByLength(template.detail, settings.length)}${suffix}`,
      `${tonePrefix(settings.tone, 2)}${trimByLength(template.action, settings.length)}${suffix}`
    ];
  }

  function renderSettings() {
    const settings = settingsState();
    settingCards.forEach((card, index) => {
      const config = settingsConfig[index];
      const body = q("span:last-child", card) || qa("span", card)[1];
      if (!config || !body) return;
      body.textContent = `当前：${settings[config.key]} · 点击切换`;
    });
  }

  function selectOutputCard(card) {
    if (!card) return;
    markSingle(outputCards, card);
    state.activeBlock = textOf(q("strong", card));
    saveState();
    setStatus("输出模块已选中", state.activeBlock, "active");
  }

  function renderOutput(mode = activeMode()) {
    const texts = buildOutputTexts(mode);
    outputBodies.forEach((body, index) => {
      if (!body || !texts[index]) return;
      body.textContent = texts[index];
      ensureEdits()[`output-${index}`] = texts[index];
    });
    saveState();
  }

  function applyMode(mode) {
    modeTabs.forEach((tab) => tab.classList.toggle("active", textOf(tab) === mode));
    state.outputMode = mode;
    saveState();
    renderOutput(mode);
  }

  bindInlineEditors(outputBodies, {
    prefix: "output",
    label: "输出内容",
    multiline: true
  });

  modeTabs.forEach((tab) => {
    bindPress(tab, (event) => {
      event.preventDefault();
      const mode = textOf(tab);
      applyMode(mode);
      setStatus("输出版本已切换", `当前版本：${mode}`, "active");
    });
  });

  outputCards.forEach((card) => {
    bindPress(card, (event) => {
      event.preventDefault();
      selectOutputCard(card);
    });
  });

  settingCards.forEach((card, index) => {
    bindPress(card, (event) => {
      event.preventDefault();
      const config = settingsConfig[index];
      const settings = settingsState();
      const currentIndex = config.options.indexOf(settings[config.key]);
      const nextValue = config.options[(currentIndex + 1) % config.options.length];
      settings[config.key] = nextValue;
      saveState();

      if (config.key === "tone") {
        applyMode(toneToMode[nextValue] || activeMode());
      } else {
        renderOutput(activeMode());
      }

      renderSettings();
      card.classList.add("is-selected");
      window.setTimeout(() => card.classList.remove("is-selected"), 420);
      setStatus(`${config.label}已切换`, `当前为：${nextValue}`, "success");
    });
  });

  const initialMode = state.outputMode || toneToMode[settingsState().tone] || "学术综述版";
  applyMode(initialMode);
  renderSettings();

  if (state.activeBlock) {
    const activeCard = outputCards.find((card) => textOf(q("strong", card)) === state.activeBlock);
    if (activeCard) markSingle(outputCards, activeCard);
  } else if (outputCards[0]) {
    markSingle(outputCards, outputCards[0]);
  }

  bindAction("生成输出", (event) => {
    event.preventDefault();
    renderOutput(activeMode());
    outputCards.forEach((card) => card.classList.add("is-saved"));
    setStatus("输出已生成", `已根据当前设置刷新 ${activeMode()} 内容。`, "success");
  });

  bindAction("复制内容", async (event) => {
    event.preventDefault();
    const content = outputBodies.map((body) => textOf(body)).join("\n\n");
    const ok = await copyText(content);
    setStatus(ok ? "内容已复制" : "复制失败", ok ? "当前输出内容已经写入剪贴板。" : "当前环境无法直接访问剪贴板。", ok ? "success" : "");
  });

  bindAction("导出文档", (event) => {
    event.preventDefault();
    const settings = settingsState();
    const ext = settings.exportType === "Word" ? "doc" : settings.exportType === "纯文本" ? "txt" : "md";
    const type = settings.exportType === "Word"
      ? "application/msword"
      : settings.exportType === "纯文本"
        ? "text/plain;charset=utf-8"
        : "text/markdown;charset=utf-8";

    const content = outputTitles
      .map((title, index) => `${textOf(title)}\n${textOf(outputBodies[index])}`)
      .join("\n\n");

    makeDownload(`research-output.${ext}`, `# ${activeMode()}\n\n${content}`, type);
    setStatus("文档已导出", `已按 ${settings.exportType} 格式生成文件。`, "success");
  });

  bindAction("继续编辑", (event) => {
    event.preventDefault();
    navigateTo("synthesis.html", "返回分析归纳", "继续补充对比与框架内容。");
  });
}

function initDemo() {
  document.body.classList.add("compact-mode");
  ensureStatus();
  bindSharedElements();

  const page = currentPage();
  if (page === "overview") bindOverview();
  if (page === "home") bindHome();
  if (page === "decompose") bindDecompose();
  if (page === "parse") bindParse();
  if (page === "synthesis") bindSynthesis();
  if (page === "output") bindOutput();
}

document.addEventListener("DOMContentLoaded", initDemo);
