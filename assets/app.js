const PAGES = {
  overview: {
    nav: '总览',
    pageNo: '00',
    heroTag: 'Project overview',
    title: 'AI研究分析助手',
    lede: '把“问题拆解、资料搜集、文档解析、分析归纳、结论输出”做成一个可以直接演示的多页网页站。',
    primary: { label: '进入第 1 页', href: 'home.html' },
    secondary: { label: '查看五页结构', href: '#chapters' },
    metrics: [
      { value: '5', label: '核心页面', desc: '输入、拆解、解析、归纳、输出' },
      { value: '4', label: '输出版本', desc: '学术、政策、企业、汇报' },
      { value: '1', label: '完整工作流', desc: '从问题到结论的连续路径' }
    ],
    panel: {
      kind: 'overview',
      title: '网页演示总览',
      subtitle: '一套带有导航、动效和多页切换的产品展示站',
      cards: [
        { title: '研究任务', text: '围绕复杂问题建立可执行的工作流。', tone: 'teal' },
        { title: '资料流转', text: '把文献、政策、报告和数据放到同一链路。', tone: 'gold' },
        { title: '结果交付', text: '输出能直接进入作品集和汇报材料的内容。', tone: 'coral' }
      ],
      footer: '适合作为作品集首页，也适合作为演示入口。'
    },
    chapters: [
      { no: '01', title: '首页 / 问题输入页', href: 'home.html', desc: '输入问题、选择场景、上传资料。' },
      { no: '02', title: '任务拆解页', href: 'decompose.html', desc: '把大问题拆成子任务和资料路径。' },
      { no: '03', title: '文档解析页', href: 'parse.html', desc: '提取摘要、观点和引用位置。' },
      { no: '04', title: '分析归纳页', href: 'synthesis.html', desc: '做跨文档对比与研究框架。' },
      { no: '05', title: '结果输出页', href: 'output.html', desc: '生成结论与策略建议。' }
    ],
    sections: [
      {
        eyebrow: '项目定位',
        title: '不是泛科研工具，而是研究分析任务的工作流平台。',
        text: '它面对的不是一般聊天场景，而是带有明确输入、分析步骤、证据整理和输出要求的知识工作任务。',
        bullets: [
          '问题拆解：将抽象研究问题变成连续任务',
          '资料搜集：统一文献、政策、案例、数据入口',
          '结果输出：可交付的综述、简报与建议'
        ]
      },
      {
        eyebrow: '目标用户',
        title: '研究者、政策分析师、ESG/行业研究人员。',
        text: '核心用户需要的是可追溯的分析过程，而不是只有结论的聊天窗口。',
        bullets: [
          '高校 / 研究机构：硕博生、青年教师、科研助理',
          '企业 / 智库：战略分析师、政策研究岗、行业研究员',
          '高频任务：文献综述、政策解读、结果解释、汇报材料'
        ]
      },
      {
        eyebrow: '导航与动效',
        title: '顶部切换 + 分页高亮 + 页面加载动画。',
        text: '页面切换会同步更新导航状态、进度提示和展示面板，保证演示时的连贯感。',
        bullets: [
          'Sticky 顶部导航，随滚动保持可见',
          '章节卡片和按钮悬浮反馈',
          '页面元素逐块 reveal，提升产品感'
        ]
      }
    ],
    footer: {
      title: '现在可以从总览页进入任一页面，完整讲述“从问题到输出”的工作流。',
      text: '如果你要拿它去演示，建议按照首页 → 拆解 → 解析 → 归纳 → 输出的顺序讲，结构最清晰。',
      primary: { label: '开始浏览', href: 'home.html' },
      secondary: { label: '看网页结构', href: '#chapters' }
    }
  },
  home: {
    nav: '01',
    pageNo: '01',
    heroTag: 'Start a task',
    title: '开始一个研究分析任务',
    lede: '让用户快速输入问题、选择任务类型并上传资料，第一屏就把起步动作完成。',
    primary: { label: '开始分析', href: '#detailGrid' },
    secondary: { label: '返回总览', href: 'index.html' },
    metrics: [
      { value: '3', label: '起步动作', desc: '输入问题、选场景、上传资料' },
      { value: '4', label: '模板入口', desc: '综述、政策、结果、建议' },
      { value: '1', label: '主任务', desc: '先把任务说清楚' }
    ],
    panel: {
      kind: 'home',
      title: '任务输入区',
      subtitle: '把问题、场景和资料放在同一屏',
      promptLabel: '请输入你的研究 / 分析问题',
      promptText: '例如：欧盟碳关税将如何影响中国制造业出口？',
      promptHint: '你可以补充研究目标、时间范围、地区范围和输出偏好。',
      chips: ['文献综述', '政策分析', 'ESG / 行业研究', '数据结果解释', '报告生成'],
      templates: [
        { title: '文献综述模板', text: '研究问题、关键词、检索范围、总结结构。', tone: 'teal' },
        { title: '政策解读模板', text: '条款、影响路径、适用行业、建议输出。', tone: 'gold' },
        { title: '企业策略建议模板', text: '风险识别、应对动作、优先级、执行建议。', tone: 'coral' }
      ],
      footer: '适合把“开始做什么”讲成一个明确入口。'
    },
    chapters: [
      { no: '01', title: '首页 / 问题输入页', href: 'home.html', desc: '当前页' },
      { no: '02', title: '任务拆解页', href: 'decompose.html', desc: '下一步' },
      { no: '03', title: '文档解析页', href: 'parse.html', desc: '信息提取' },
      { no: '04', title: '分析归纳页', href: 'synthesis.html', desc: '跨文档对比' },
      { no: '05', title: '结果输出页', href: 'output.html', desc: '最终交付' }
    ],
    sections: [
      {
        eyebrow: '左侧内容区',
        title: '任务输入、场景选择和资料上传放在一起。',
        text: '首页的重点是降低起始成本，让用户把任务拉到工作流里。',
        bullets: [
          '输入框：研究 / 分析问题',
          '场景：综述、政策、ESG、结果解释、报告',
          '上传：PDF、Word、网页链接'
        ]
      },
      {
        eyebrow: '右侧内容区',
        title: '把高频任务收拢到模板。',
        text: '用户不需要先想结构，先从模板起步，再逐步修正。',
        bullets: [
          '文献综述模板',
          '政策解读模板',
          '回归结果解释模板',
          '企业策略建议模板'
        ]
      },
      {
        eyebrow: '页面目标',
        title: '把“想做什么”变成“马上能开始做什么”。',
        text: '第 1 页不是展示复杂能力，而是让任务进入系统。',
        bullets: [
          '输入任务',
          '选择模板',
          '上传资料并开始分析'
        ]
      }
    ],
    footer: {
      title: '这一页的任务是开启，而不是解释太多。',
      text: '如果这一步清楚，后面拆解、解析、归纳和输出就有了入口。',
      primary: { label: '去任务拆解', href: 'decompose.html' },
      secondary: { label: '回到总览', href: 'index.html' }
    }
  },
  decompose: {
    nav: '02',
    pageNo: '02',
    heroTag: 'Task decomposition',
    title: '任务拆解与分析路径',
    lede: '把一个大问题拆成连续可执行的子任务，明确搜集、分析和输出的顺序。',
    primary: { label: '继续检索资料', href: '#detailGrid' },
    secondary: { label: '上一页', href: 'home.html' },
    metrics: [
      { value: '5', label: '子任务', desc: '问题、资料、提取、归纳、输出' },
      { value: '4', label: '资料源', desc: '政策、论文、报告、数据' },
      { value: '1', label: '路径', desc: '从大问题到分析框架' }
    ],
    panel: {
      kind: 'decompose',
      title: '拆解结果',
      subtitle: '把大问题变成任务链路',
      promptLabel: '原始问题',
      promptText: '欧盟碳关税将如何影响中国制造业出口？',
      promptHint: '建议先限定范围，再拆成资料搜集与分析路径。',
      steps: [
        '明确研究问题和范围',
        '搜集相关文献、案例、政策材料',
        '提取关键观点、变量、机制、结论',
        '对多份材料进行对比和归纳',
        '形成分析框架并输出结论'
      ],
      footer: '拆解的价值是让任务有顺序，而不是一次性丢给用户。'
    },
    chapters: [
      { no: '01', title: '首页 / 问题输入页', href: 'home.html', desc: '输入任务' },
      { no: '02', title: '任务拆解页', href: 'decompose.html', desc: '当前页' },
      { no: '03', title: '文档解析页', href: 'parse.html', desc: '信息提取' },
      { no: '04', title: '分析归纳页', href: 'synthesis.html', desc: '逻辑整理' },
      { no: '05', title: '结果输出页', href: 'output.html', desc: '最后一步' }
    ],
    sections: [
      {
        eyebrow: '子任务链',
        title: '把抽象问题拆成连续任务。',
        text: '从问题定义、资料检索、观点提取到结论输出，每一步都对应一个明确动作。',
        bullets: [
          '1. 明确研究问题和范围',
          '2. 搜集文献、案例、政策材料',
          '3. 提取关键观点、变量、机制、结论',
          '4. 对多份材料进行对比和归纳',
          '5. 形成分析框架并输出结论'
        ]
      },
      {
        eyebrow: '资料来源',
        title: '资料入口按类型整理。',
        text: '把“去哪里找”变成清晰的信息源分类。',
        bullets: [
          '欧盟官方政策文件',
          '相关研究论文',
          '行业报告',
          '出口统计数据'
        ]
      },
      {
        eyebrow: '产品洞察',
        title: '真正的价值在于把复杂任务做成连续工作流。',
        text: '这一页承接首页，确保用户知道下一步应该做什么。',
        bullets: [
          '不是生成一段话',
          '而是给出分析路径',
          '并把资料入口明确出来'
        ]
      }
    ],
    footer: {
      title: '拆解页不是结论页，它是研究工作流的骨架。',
      text: '如果拆解准确，后面的解析和归纳会轻很多。',
      primary: { label: '去文档解析', href: 'parse.html' },
      secondary: { label: '上一页', href: 'home.html' }
    }
  },
  parse: {
    nav: '03',
    pageNo: '03',
    heroTag: 'Document parsing',
    title: '文档解析与信息提取',
    lede: '左侧阅读文档，右侧提炼摘要、关键观点、关键变量和引用位置。',
    primary: { label: '生成摘要', href: '#detailGrid' },
    secondary: { label: '上一页', href: 'decompose.html' },
    metrics: [
      { value: '100', label: '字摘要', desc: '快速扫读' },
      { value: '300', label: '字摘要', desc: '中等长度总结' },
      { value: '3', label: '引用位点', desc: '页码、段落、图表' }
    ],
    panel: {
      kind: 'parse',
      title: '文档阅读区',
      subtitle: '边读边提炼',
      docTitle: 'PDF 预览',
      docText: 'Selected page / highlighted paragraph / selected quote',
      docHint: '支持高亮、选中文字提问、快速跳转引用位置。',
      highlights: [
        '100字摘要 / 300字摘要',
        '核心观点、关键变量 / 指标',
        '研究方法 / 政策条款 / 时间节点',
        '第 3 页第 2 段，第 5 页图表 1'
      ],
      footer: '解析页的目标是把长文档压缩成可浏览、可引用、可对比的结构。'
    },
    chapters: [
      { no: '01', title: '首页 / 问题输入页', href: 'home.html', desc: '输入任务' },
      { no: '02', title: '任务拆解页', href: 'decompose.html', desc: '分析路径' },
      { no: '03', title: '文档解析页', href: 'parse.html', desc: '当前页' },
      { no: '04', title: '分析归纳页', href: 'synthesis.html', desc: '跨文档对比' },
      { no: '05', title: '结果输出页', href: 'output.html', desc: '最后交付' }
    ],
    sections: [
      {
        eyebrow: '左侧阅读区',
        title: '把文档阅读变成结构化浏览。',
        text: '页面预览、选中高亮和提问入口帮助用户更快进入信息提取。',
        bullets: [
          'PDF 文档预览',
          '支持高亮与提问',
          '可快速定位引用位置'
        ]
      },
      {
        eyebrow: '右侧输出区',
        title: '摘要、观点、变量与条款同步提取。',
        text: '输出不是长段回答，而是可以复用到后续分析中的结构化卡片。',
        bullets: [
          '摘要：100字 / 300字',
          '关键信息：核心观点、变量、条款',
          '引用位置：页码、段落、图表'
        ]
      },
      {
        eyebrow: '使用价值',
        title: '为后续对比和归纳提供标准化输入。',
        text: '只有把单篇文档处理干净，跨文档对比才有意义。',
        bullets: [
          '先提取，再对比',
          '先标注，再归纳',
          '先结构化，再输出'
        ]
      }
    ],
    footer: {
      title: '这一页是信息提取，不是最后结论。',
      text: '把内容变成结构化对象，后面的归纳和输出才能自然发生。',
      primary: { label: '去分析归纳', href: 'synthesis.html' },
      secondary: { label: '上一页', href: 'decompose.html' }
    }
  },
  synthesis: {
    nav: '04',
    pageNo: '04',
    heroTag: 'Cross-document synthesis',
    title: '分析归纳与跨文档对比',
    lede: '把多份资料整合成可用的分析框架，重点是对比、归纳和研究空白。',
    primary: { label: '生成综述提纲', href: '#detailGrid' },
    secondary: { label: '上一页', href: 'parse.html' },
    metrics: [
      { value: '6', label: '对比字段', desc: '名称、机制、结论、行业等' },
      { value: '4', label: '归纳项', desc: '共识、分歧、空白、问题' },
      { value: '1', label: '框架图', desc: '政策 → 成本 → 调整 → 策略' }
    ],
    panel: {
      kind: 'synthesis',
      title: '跨文档对比',
      subtitle: '用表格和框架把材料串起来',
      matrix: [
        ['文献 / 政策名称', '研究问题 / 条款重点', '核心机制', '主要结论', '适用行业', '差异点'],
        ['系统归纳结果', '共同结论、分歧观点、研究空白、可进一步验证的问题']
      ],
      framework: ['政策变化', '成本影响', '出口调整', '企业应对策略'],
      footer: '这一步决定研究结果是否足够“像分析”，而不是仅仅像摘要集合。'
    },
    chapters: [
      { no: '01', title: '首页 / 问题输入页', href: 'home.html', desc: '输入任务' },
      { no: '02', title: '任务拆解页', href: 'decompose.html', desc: '分析路径' },
      { no: '03', title: '文档解析页', href: 'parse.html', desc: '信息提取' },
      { no: '04', title: '分析归纳页', href: 'synthesis.html', desc: '当前页' },
      { no: '05', title: '结果输出页', href: 'output.html', desc: '成果交付' }
    ],
    sections: [
      {
        eyebrow: '对比表',
        title: '把多份资料放在同一张表里。',
        text: '统一字段后才能看出一致点、分歧点和遗漏点。',
        bullets: [
          '文献 / 政策名称',
          '研究问题 / 条款重点',
          '核心机制、结论、适用行业、差异点'
        ]
      },
      {
        eyebrow: '归纳结果',
        title: '共同结论、分歧观点和研究空白。',
        text: '这一层是从资料到分析的关键过渡。',
        bullets: [
          '共同结论',
          '分歧观点',
          '研究空白',
          '可进一步验证的问题'
        ]
      },
      {
        eyebrow: '分析框架',
        title: '把政策变化到企业应对的逻辑链串起来。',
        text: '你需要的不只是结果表，还要有一条能讲清楚传导过程的逻辑线。',
        bullets: [
          '政策变化',
          '成本影响',
          '出口调整',
          '企业应对策略'
        ]
      }
    ],
    footer: {
      title: '这一步决定分析是否有“结构感”。',
      text: '如果对比清楚，输出页就会更容易形成可交付成果。',
      primary: { label: '去结果输出', href: 'output.html' },
      secondary: { label: '上一页', href: 'parse.html' }
    }
  },
  output: {
    nav: '05',
    pageNo: '05',
    heroTag: 'Output and advice',
    title: '生成结论与策略建议',
    lede: '把分析结果转成四种可交付版本：学术综述、政策简报、企业建议和汇报摘要。',
    primary: { label: '生成输出', href: '#detailGrid' },
    secondary: { label: '上一页', href: 'synthesis.html' },
    metrics: [
      { value: '4', label: '输出版本', desc: '学术、政策、企业、汇报' },
      { value: '3', label: '输出模块', desc: '结论、分析、建议' },
      { value: '1', label: '交付目标', desc: '可直接使用' }
    ],
    panel: {
      kind: 'output',
      title: '输出设置',
      subtitle: '让内容更像可交付成果',
      modes: ['学术综述版', '政策简报版', '企业建议版', '汇报摘要版'],
      blocks: ['核心结论', '详细分析', '建议部分'],
      options: ['语气风格', '字数长度', '是否保留引用', '导出格式'],
      footer: '输出页的重点是把分析结果变成真正能拿去用的内容。'
    },
    chapters: [
      { no: '01', title: '首页 / 问题输入页', href: 'home.html', desc: '输入任务' },
      { no: '02', title: '任务拆解页', href: 'decompose.html', desc: '分析路径' },
      { no: '03', title: '文档解析页', href: 'parse.html', desc: '信息提取' },
      { no: '04', title: '分析归纳页', href: 'synthesis.html', desc: '逻辑整理' },
      { no: '05', title: '结果输出页', href: 'output.html', desc: '当前页' }
    ],
    sections: [
      {
        eyebrow: '输出版本',
        title: '学术、政策、企业、汇报四种版本。',
        text: '同一个分析结果，通过不同输出模板满足不同场景。',
        bullets: [
          '学术综述版',
          '政策简报版',
          '企业建议版',
          '汇报摘要版'
        ]
      },
      {
        eyebrow: '主内容区',
        title: '核心结论、详细分析和建议部分。',
        text: '结果结构化后，既能复制到文档，也能作为汇报素材。',
        bullets: [
          '一段式核心结论',
          '影响路径与风险点',
          '短期 / 中期建议'
        ]
      },
      {
        eyebrow: '输出设置',
        title: '语气、长度、引用和导出格式。',
        text: '把交付标准提前设定好，减少后期返工。',
        bullets: [
          '语气风格',
          '字数长度',
          '是否保留引用',
          '导出格式'
        ]
      }
    ],
    footer: {
      title: '如果前四页都清楚，这一页就能自然把分析结果变成成果。',
      text: '它负责收口和交付，是整个工作流的最后一公里。',
      primary: { label: '回到总览', href: 'index.html' },
      secondary: { label: '返回分析归纳', href: 'synthesis.html' }
    }
  }
};

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function createNavLink(item, active) {
  const link = el('a', `nav-link${active ? ' active' : ''}`);
  link.href = item.href;
  link.innerHTML = `<span class="nav-index">${item.no}</span><span>${item.title}</span>`;
  return link;
}

function createChapterCard(item, active) {
  const card = el('a', `chapter-card reveal${active ? ' active' : ''}`);
  card.href = item.href;
  card.innerHTML = `<small>${item.no}</small><strong>${item.title}</strong><span>${item.desc}</span>`;
  return card;
}

function createMetricCard(metric) {
  return `<div class="metric-card reveal"><strong>${metric.value}</strong><span>${metric.label}</span><span>${metric.desc}</span></div>`;
}

function renderPanel(page) {
  const panel = document.getElementById('heroPanel');
  if (!panel) return;
  let body = '';

  if (page.panel.kind === 'overview') {
    body = `
      <div class="demo-frame reveal float-1">
        <div class="demo-head">
          <div class="window-dots"><span></span><span></span><span></span></div>
          <div class="demo-tag">Demo overview</div>
        </div>
        <div class="demo-body">
          <div class="preview-shell">
            <div class="preview-toolbar">
              <div>
                <strong>${page.panel.title}</strong>
                <span>${page.panel.subtitle}</span>
              </div>
              <div class="tag-row">
                <span class="tag teal">5 pages</span>
                <span class="tag gold">workflow</span>
              </div>
            </div>
            <div class="preview-grid-three">
              ${page.panel.cards.map((card) => `<div class="preview-card${card.tone === 'teal' ? ' dark' : ''}"><h4>${card.title}</h4><p>${card.text}</p><div class="tag-row">${card.tone === 'teal' ? '<span class="tag teal">research</span>' : card.tone === 'gold' ? '<span class="tag gold">analysis</span>' : '<span class="tag coral">output</span>'}</div></div>`).join('')}
            </div>
          </div>
          <div class="callout" style="background: rgba(255,255,255,0.86); border-color: rgba(255,255,255,0.14);">
            <strong>${page.panel.footer}</strong>
            <span>顶部导航切换到不同页面后，右侧演示区会同步显示对应结构。</span>
          </div>
        </div>
      </div>
    `;
  }

  if (page.panel.kind === 'home') {
    body = `
      <div class="demo-frame reveal float-1">
        <div class="demo-head">
          <div class="window-dots"><span></span><span></span><span></span></div>
          <div class="demo-tag">Task input</div>
        </div>
        <div class="demo-body">
          <div class="preview-shell">
            <div class="preview-toolbar">
              <div>
                <strong>${page.panel.title}</strong>
                <span>${page.panel.subtitle}</span>
              </div>
              <div class="tag-row"><span class="tag teal">step 1</span></div>
            </div>
            <div class="preview-card">
              <h4>${page.panel.promptLabel}</h4>
              <div class="preview-input">
                <div class="label">问题输入</div>
                <div class="prompt">${page.panel.promptText}<em>${page.panel.promptHint}</em></div>
              </div>
              <div class="chip-row">${page.panel.chips.map((chip, index) => `<span class="chip ${index === 0 ? 'teal' : index === 1 ? 'coral' : index === 2 ? 'gold' : ''}">${chip}</span>`).join('')}</div>
            </div>
            <div class="preview-grid-three">
              ${page.panel.templates.map((template) => `<div class="preview-card-alt"><h4>${template.title}</h4><p>${template.text}</p></div>`).join('')}
            </div>
          </div>
          <div class="progress-bar"><span style="width:28%"></span></div>
        </div>
      </div>
    `;
  }

  if (page.panel.kind === 'decompose') {
    body = `
      <div class="demo-frame reveal float-1">
        <div class="demo-head">
          <div class="window-dots"><span></span><span></span><span></span></div>
          <div class="demo-tag">Task chain</div>
        </div>
        <div class="demo-body">
          <div class="preview-shell">
            <div class="preview-toolbar">
              <div>
                <strong>${page.panel.title}</strong>
                <span>${page.panel.subtitle}</span>
              </div>
              <div class="tag-row"><span class="tag coral">step 2</span></div>
            </div>
            <div class="preview-card">
              <h4>${page.panel.promptLabel}</h4>
              <div class="preview-input">
                <div class="label">原始问题</div>
                <div class="prompt">${page.panel.promptText}<em>${page.panel.promptHint}</em></div>
              </div>
            </div>
            <div class="preview-grid-two">
              <div class="preview-list-card">
                <h4>子任务链</h4>
                <div class="list-grid" style="margin-top:10px;">${page.panel.steps.map((step, idx) => `<div class="list-item"><strong>${idx + 1}. ${step}</strong><span>系统会把复杂问题拆成连续动作。</span></div>`).join('')}</div>
              </div>
              <div class="preview-list-card">
                <h4>资料来源</h4>
                <div class="list-grid" style="margin-top:10px;">
                  <div class="list-item"><strong>欧盟官方政策文件</strong><span>条款、执行时间、覆盖范围。</span></div>
                  <div class="list-item"><strong>相关研究论文</strong><span>机制解释、变量识别、研究空白。</span></div>
                  <div class="list-item"><strong>行业报告</strong><span>行业影响、案例和市场判断。</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="progress-bar"><span style="width:48%"></span></div>
        </div>
      </div>
    `;
  }

  if (page.panel.kind === 'parse') {
    body = `
      <div class="demo-frame reveal float-1">
        <div class="demo-head">
          <div class="window-dots"><span></span><span></span><span></span></div>
          <div class="demo-tag">Document reader</div>
        </div>
        <div class="demo-body">
          <div class="preview-shell">
            <div class="preview-toolbar">
              <div>
                <strong>${page.panel.title}</strong>
                <span>${page.panel.subtitle}</span>
              </div>
              <div class="tag-row"><span class="tag gold">step 3</span></div>
            </div>
            <div class="preview-grid-two">
              <div class="preview-card">
                <h4>${page.panel.docTitle}</h4>
                <div class="preview-input">
                  <div class="label">PDF 预览</div>
                  <div class="prompt" style="min-height: 270px; display:flex; flex-direction:column; justify-content:space-between; background: linear-gradient(180deg,#fbfcfd,#eef3f7);"><span>${page.panel.docText}</span><em>${page.panel.docHint}</em></div>
                </div>
              </div>
              <div class="preview-card-alt">
                <h4>解析结果区</h4>
                <div class="list-grid" style="margin-top:10px;">${page.panel.highlights.map((item) => `<div class="list-item"><strong>${item}</strong><span>用于后续对比和归纳。</span></div>`).join('')}</div>
              </div>
            </div>
          </div>
          <div class="progress-bar"><span style="width:66%"></span></div>
        </div>
      </div>
    `;
  }

  if (page.panel.kind === 'synthesis') {
    body = `
      <div class="demo-frame reveal float-1">
        <div class="demo-head">
          <div class="window-dots"><span></span><span></span><span></span></div>
          <div class="demo-tag">Cross compare</div>
        </div>
        <div class="demo-body">
          <div class="preview-shell">
            <div class="preview-toolbar">
              <div>
                <strong>${page.panel.title}</strong>
                <span>${page.panel.subtitle}</span>
              </div>
              <div class="tag-row"><span class="tag slate">step 4</span></div>
            </div>
            <div class="preview-table-card">
              <h4>跨文档对比</h4>
              <div class="list-grid" style="margin-top:10px;">
                <div class="list-item"><strong>${page.panel.matrix[0][0]}</strong><span>${page.panel.matrix[0].slice(1).join(' / ')}</span></div>
                <div class="list-item"><strong>${page.panel.matrix[1][0]}</strong><span>${page.panel.matrix[1][1]}</span></div>
              </div>
            </div>
            <div class="preview-grid-two">
              <div class="preview-outline-card">
                <h4>系统归纳结果</h4>
                <div class="chip-row"><span class="chip teal">共同结论</span><span class="chip coral">分歧观点</span><span class="chip gold">研究空白</span></div>
                <p>把分析过程从“资料集合”推进到“研究结论”。</p>
              </div>
              <div class="preview-outline-card">
                <h4>分析框架图</h4>
                <div class="list-grid" style="margin-top:10px;">${page.panel.framework.map((item) => `<div class="list-item"><strong>${item}</strong><span>逻辑链中的一个关键节点。</span></div>`).join('')}</div>
              </div>
            </div>
          </div>
          <div class="progress-bar"><span style="width:82%"></span></div>
        </div>
      </div>
    `;
  }

  if (page.panel.kind === 'output') {
    body = `
      <div class="demo-frame reveal float-1">
        <div class="demo-head">
          <div class="window-dots"><span></span><span></span><span></span></div>
          <div class="demo-tag">Output editor</div>
        </div>
        <div class="demo-body">
          <div class="preview-shell">
            <div class="preview-toolbar">
              <div>
                <strong>${page.panel.title}</strong>
                <span>${page.panel.subtitle}</span>
              </div>
              <div class="tag-row"><span class="tag teal">step 5</span></div>
            </div>
            <div class="preview-card">
              <h4>输出类型切换</h4>
              <div class="chip-row">${page.panel.modes.map((mode, index) => `<span class="chip ${index === 0 ? 'teal' : index === 1 ? 'coral' : index === 2 ? 'gold' : 'slate'}">${mode}</span>`).join('')}</div>
            </div>
            <div class="preview-grid-two">
              <div class="preview-list-card">
                <h4>主内容区</h4>
                <div class="list-grid" style="margin-top:10px;">${page.panel.blocks.map((block) => `<div class="list-item"><strong>${block}</strong><span>一段摘要 / 详细分析 / 建议部分。</span></div>`).join('')}</div>
              </div>
              <div class="preview-list-card">
                <h4>输出设置</h4>
                <div class="list-grid" style="margin-top:10px;">${page.panel.options.map((option) => `<div class="list-item"><strong>${option}</strong><span>提升内容可交付性。</span></div>`).join('')}</div>
              </div>
            </div>
          </div>
          <div class="progress-bar"><span style="width:100%"></span></div>
        </div>
      </div>
    `;
  }

  panel.innerHTML = body;
}

function renderSections(page) {
  const grid = document.getElementById('detailGrid');
  if (!grid) return;
  grid.innerHTML = page.sections.map((section, index) => `
    <article class="detail-card reveal">
      <div class="eyebrow">${section.eyebrow}</div>
      <h3>${section.title}</h3>
      <p>${section.text}</p>
      <ul class="detail-list">
        ${section.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
      </ul>
      <div class="detail-meta">
        <span class="tag ${index === 0 ? 'teal' : index === 1 ? 'coral' : 'gold'}">${section.eyebrow}</span>
      </div>
    </article>
  `).join('');
}

function renderFooter(page) {
  const footer = document.getElementById('footerPanel');
  if (!footer) return;
  footer.innerHTML = `
    <div>
      <h3>${page.footer.title}</h3>
      <p>${page.footer.text}</p>
    </div>
    <div class="footer-actions">
      <a class="btn btn-primary btn-arrow" href="${page.footer.primary.href}">${page.footer.primary.label}</a>
      <a class="btn btn-secondary" href="${page.footer.secondary.href}">${page.footer.secondary.label}</a>
    </div>
  `;
}

function renderNavigation(currentKey) {
  const nav = document.getElementById('siteNav');
  if (!nav) return;
  const order = [
    { key: 'overview', no: '00', title: '总览', href: 'index.html' },
    { key: 'home', no: '01', title: '首页', href: 'home.html' },
    { key: 'decompose', no: '02', title: '拆解', href: 'decompose.html' },
    { key: 'parse', no: '03', title: '解析', href: 'parse.html' },
    { key: 'synthesis', no: '04', title: '归纳', href: 'synthesis.html' },
    { key: 'output', no: '05', title: '输出', href: 'output.html' }
  ];
  nav.innerHTML = '';
  order.forEach((item) => nav.appendChild(createNavLink(item, item.key === currentKey)));
}

function renderChapters(page) {
  const strip = document.getElementById('chapterStrip');
  if (!strip) return;
  strip.innerHTML = '';
  page.chapters.forEach((item, index) => {
    strip.appendChild(createChapterCard(item, page.pageNo === item.no || (page.pageNo === '00' && index === 0)));
  });
}

function setupRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
}

function setupButtons() {
  document.querySelectorAll('[data-scroll-to]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = document.querySelector(button.dataset.scrollTo);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function setupHeaderTheme(page) {
  document.documentElement.style.setProperty('--page-accent', page.panel.kind === 'overview' ? '#12314a' : 'var(--accent)');
}

function init() {
  const key = document.body.dataset.page || 'overview';
  const page = PAGES[key] || PAGES.overview;

  document.title = `${page.title}｜AI研究分析助手`;
  document.body.classList.add('is-ready');

  const eyebrow = document.getElementById('eyebrow');
  const title = document.getElementById('pageTitle');
  const lede = document.getElementById('pageLede');
  const actions = document.getElementById('heroActions');
  const metrics = document.getElementById('heroMetrics');

  if (eyebrow) eyebrow.textContent = `${page.pageNo}｜${page.heroTag}`;
  if (title) title.textContent = page.title;
  if (lede) lede.textContent = page.lede;
  if (actions) {
    actions.innerHTML = `
      <a class="btn btn-primary btn-arrow" href="${page.primary.href}">${page.primary.label}</a>
      <a class="btn btn-secondary" href="${page.secondary.href}">${page.secondary.label}</a>
    `;
  }
  if (metrics) metrics.innerHTML = page.metrics.map(createMetricCard).join('');

  renderNavigation(key);
  renderPanel(page);
  renderChapters(page);
  renderSections(page);
  renderFooter(page);
  setupButtons();
  setupRevealObserver();
  setupHeaderTheme(page);

  requestAnimationFrame(() => document.body.classList.add('ready'));
}

document.addEventListener('DOMContentLoaded', init);
