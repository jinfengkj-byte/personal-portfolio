"use client";

import { type MouseEvent, useEffect, useState } from "react";

type Project = {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  summary: string;
  outcome: string;
  role: string;
  stack: string[];
  status: string;
  image?: string;
  gallery?: string[];
  highlights?: string[];
  tone: "amber" | "cyan" | "violet" | "blue" | "rose";
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

const projects: Project[] = [
  {
    id: "job-agent",
    number: "01",
    title: "OfferPilot",
    eyebrow: "AI求职决策与行动系统 · 桌面端",
    summary: "把分散的找工作步骤收进一个工作台：搜索真实招聘入口、解析岗位、核验企业、按JD优化简历、准备面试，并持续记录每一次申请。",
    outcome: "已经形成从职位发现、企业风险核验、岗位决策、材料准备到进展复盘的完整求职链路；数据优先保存在本机，关键投递动作由用户确认。",
    role: "产品定义、信息架构、交互与视觉设计、评分规则、Electron桌面端、本地数据与浏览器协助",
    stack: ["Electron", "React", "TypeScript", "SQLite", "Playwright"],
    status: "完整产品 · 本地运行 · 持续迭代",
    image: "/portfolio-assets/offerpilot-home.png",
    gallery: [
      "/portfolio-assets/offerpilot-home.png",
      "/portfolio-assets/offerpilot-jobs.png",
      "/portfolio-assets/offerpilot-company.png",
    ],
    highlights: ["全网职位探索", "免费企业背调", "一岗一版简历", "浏览器平台协助", "求职进展复盘"],
    tone: "amber",
  },
  {
    id: "n8n-learning",
    number: "02",
    title: "n8n学习助手",
    eyebrow: "内容产品 · 已形成上架包",
    summary: "用反直觉案例和可操作练习，帮助零基础用户理解自动化工作流，而不是只记节点名称。",
    outcome: "已有完整课程、免费体验版、销售页和平台展示素材，可直接作为数字产品演示。",
    role: "产品定位、课程结构、交互教学、视觉物料与交付包装",
    stack: ["n8n", "交互HTML", "课程设计", "内容产品"],
    status: "可演示 · 已有完整上架包",
    image: "/portfolio-assets/n8n-cover.jpg",
    tone: "blue",
    primary: { label: "打开学习助手", href: "/demos/n8n/index.html" },
  },
  {
    id: "city-intel",
    number: "03",
    title: "中国城市结构｜59城交互地图",
    eyebrow: "城市研究产品 · 59城覆盖 · 7类结构",
    summary: "不再用一张榜单粗暴定义城市。把59座城市及区域铺到同一张中国地图上，先看它在全国结构中的位置，再打开完整报告读懂机会、成本与风险。",
    outcome: "产品已收录59座城市及区域，并按直辖市、副省级、计划单列市、强省会、战略枢纽、功能疏导节点、粤港澳都市圈7类城市角色组织。用户可以搜索城市、按类型筛选、在地图上悬停预览，并一键打开对应的完整研究PDF。每份报告沿用26页深度结构，从GDP、人口与产业，延伸到头部企业、创新主体、年轻人发展与“城市漂”、社会流动、房价交通、公共财政、城投压力、惠民政策、民生风情、AI时代位置及未来十年方向。它不是城市排行榜，而是一张回答“去哪里发展、在哪里落子、哪座城市正在发生结构性变化”的决策地图。",
    role: "统一城市研究框架、逐城数据建模、产业与青年机会解读、财政风险口径设计、图表叙事及PPT/PDF自动化生产",
    stack: ["59城研究库", "7类城市角色", "交互地图", "人口·经济·产业", "青年机会", "财政·城投", "AI版图", "PPT/PDF"],
    status: "已完成 · 59份城市研究PDF已接入桌面交互地图",
    image: "/portfolio-assets/city-cover.jpg",
    tone: "blue",
    primary: { label: "打开中国城市结构地图", href: "/demos/china-city-structure/index.html" },
  },
  {
    id: "daily-intel",
    number: "04",
    title: "AI情报自动化系统",
    eyebrow: "自动化产品 · 每日运行",
    summary: "从全球新闻、官方公告、开发者社区与社交平台持续捕捉高价值信号，把信息差压缩成管理者和创业者当天就能使用的决策简报。",
    outcome: "覆盖 GitHub、Reuters、Associated Press (AP)、Agence France-Presse (AFP)、Bloomberg 公开信号，以及 X、Reddit、Product Hunt、Hacker News；并交叉核验公司官网与 IR、SEC、央行、IMF、World Bank、arXiv 等一手来源。每天交付22页领导情报与8页创业雷达，让读者一眼看清：发生了什么、为什么重要、机会与风险在哪里、下一步该做什么。",
    role: "多源情报架构、GitHub动态追踪、可信度分级、跨源核验、商业机会提炼、信息图叙事与自动化交付",
    stack: ["全球权威信源", "官方与一手数据", "科技社区信号", "Codex", "Python", "PowerPoint", "PDF QA"],
    status: "持续运行 · 每日双时段捕捉新增商业信号",
    image: "/portfolio-assets/radar-cover.png",
    tone: "violet",
    primary: { label: "查看创业雷达样例", href: "/samples/ai-radar-sample.pdf" },
    secondary: { label: "查看每日情报样例", href: "/samples/global-intel-sample.pdf" },
  },
  {
    id: "assessment",
    number: "05",
    title: "在线测评产品矩阵",
    eyebrow: "线上产品 · 双站点",
    summary: "人格倾向测评与专业八字排盘保持独立定位、独立入口和移动端体验。",
    outcome: "两个产品均已上线；展示从产品拆分、界面适配到域名部署的完整能力。",
    role: "产品拆分、移动端优化、部署、DNS与上线验收",
    stack: ["Next.js", "React", "Cloudflare", "Nginx", "移动端"],
    status: "线上运行 · 双产品独立部署",
    tone: "rose",
    primary: { label: "打开MBTI测评", href: "https://type16test.top/" },
    secondary: { label: "打开八字排盘", href: "https://bazi.type16test.top/" },
  },
];

const labs = [
  { title: "雅思阶梯", tag: "约2万词库 · 作品收录", href: undefined },
  { title: "SQL学习平台", tag: "交互练习与考试", href: undefined },
  { title: "Python学习助手", tag: "本地代码练习", href: undefined },
  { title: "AIGC提示词产品", tag: "50条完整提示词包", href: undefined },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [active, setActive] = useState<Project | null>(null);

  const goToSection = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "auto", block: "start" });
    event.currentTarget.blur();
  };

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setActive(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <main>
      <nav className="nav-shell" aria-label="主导航">
        <a className="brand" href="#top" onClick={(event) => goToSection(event, "top")}>
          <span className="brand-mark"><img src="/favicon.svg" alt="" /></span>
          <span className="brand-copy"><strong>刘的 AI Portfolio</strong><small>联系方式 13021857963</small></span>
        </a>
        <div className="nav-links">
          <a href="#work" onClick={(event) => goToSection(event, "work")}>作品</a>
          <a href="#capabilities" onClick={(event) => goToSection(event, "capabilities")}>能力</a>
          <a href="#lab" onClick={(event) => goToSection(event, "lab")}>实验室</a>
        </div>
        <a className="nav-cta" href="#work" onClick={(event) => goToSection(event, "work")}>浏览作品 <Arrow /></a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="status-line"><span /> 个人AI产品作品集 · 真实项目持续迭代</div>
          <h1><span>把复杂问题，</span><em>做成真正可用的产品。</em></h1>
          <p className="hero-intro">从一个真实需求出发，推进到能运行、能验证、能持续迭代的交付。</p>
          <p className="hero-lead">核心案例覆盖AI求职决策、自动化学习、城市数据、每日情报和在线测评。这里展示的不只是界面，而是问题判断、产品设计、工程实现和实际运行结果。</p>
          <div className="hero-actions">
            <a className="button primary hero-nav-button" href="#work" onClick={(event) => goToSection(event, "work")}>看看我做过什么 <span className="hero-nav-icon work-icon" aria-hidden="true">↓</span></a>
            <a className="button ghost hero-nav-button" href="#capabilities" onClick={(event) => goToSection(event, "capabilities")}>我的产品方法 <span className="hero-nav-icon method-icon" aria-hidden="true">→</span></a>
          </div>
          <div className="metrics" aria-label="作品集统计">
            <div><strong>10+</strong><span>产品与实验</span></div>
            <div><strong>2</strong><span>线上产品</span></div>
            <div><strong>5</strong><span>核心案例</span></div>
            <div><strong>2×</strong><span>每日自动交付</span></div>
          </div>
        </div>

        <div className="hero-visual" aria-label="产品能力概览">
          <div className="orb orb-one" /><div className="orb orb-two" />
          <div className="console-card">
            <div className="console-head"><span>MY PRODUCT WORKFLOW</span><b><i /> 5 STAGES</b></div>
            <div className="flow-title">从想法推进到可验证作品</div>
            <div className="flow">
              {["需求", "设计", "构建", "验收", "交付"].map((step, index) => (
                <div className="flow-step" key={step}><i>{String(index + 1).padStart(2, "0")}</i><span>{step}</span></div>
              ))}
            </div>
            <div className="signal-grid">
              <div><small>产品起点</small><strong>真实问题，而非概念演示</strong></div>
              <div><small>判断原则</small><strong>证据优先 · 人工可控</strong></div>
              <div><small>交付形态</small><strong>Web · 桌面 · 自动化</strong></div>
              <div><small>当前状态</small><strong className="green">● 5组核心案例可展示</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section work-section" id="work">
        <div className="section-heading">
          <div><span className="section-index">01 / SELECTED WORK</span><h2>核心作品</h2></div>
          <p>五组真实项目，从桌面软件、学习体验和数据叙事，到自动化生产与线上部署，呈现完整的产品推进能力。</p>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project-card ${index === 0 ? "featured" : ""}`} key={project.id}>
              {index !== 0 && <button className="card-hit" aria-label={`查看${project.title}`} onClick={() => setActive(project)} />}
              <div className={`project-media tone-${project.tone} ${project.id === "job-agent" ? "offerpilot-media" : ""}`}>
                {project.image ? <>
                  <img src={project.image} alt={`${project.title}产品界面`} />
                  {project.id === "job-agent" && <div className="offerpilot-overlay">
                    <span>真实产品界面</span><b>职位 · 企业 · 简历 · 面试 · 进展</b>
                  </div>}
                </> : project.id === "job-agent" ? (
                  <div className="job-mock">
                    <div className="job-top"><span><i /> OFFERPILOT</span><b>关键动作由本人确认</b></div>
                    <div className="job-intro">
                      <small>智能求职行动台</small>
                      <strong>把一份岗位，变成一套<br /><em>可直接行动的求职方案</em></strong>
                      <p>读懂要求 · 找到证据 · 准备沟通</p>
                    </div>
                    <div className="job-feature-grid">
                      <div className="job-feature job-feature-primary">
                        <div className="job-feature-head"><span>核心能力</span><b>01</b></div>
                        <h4>岗位作战卡</h4>
                        <p>自动拆解招聘要求，直接告诉你哪里匹配、缺什么、下一步怎么做。</p>
                        <div className="job-proof-list">
                          <span><i /> 必须满足</span><span><i /> 优势证据</span><span><i /> 风险提醒</span>
                        </div>
                      </div>
                      <div className="job-feature job-feature-secondary">
                        <span>自动准备</span><h4>定制沟通材料</h4><p>简历要点 · 招呼语 · 面试问题</p>
                      </div>
                      <div className="job-feature job-feature-secondary">
                        <span>全程可控</span><h4>投递进度看板</h4><p>待确认 · 已投递 · 待跟进</p>
                      </div>
                    </div>
                    <div className="job-flowline" aria-label="工作流程">
                      <span><b>01</b>发现岗位</span><i>→</i><span><b>02</b>AI整理</span><i>→</i><span className="is-human"><b>03</b>本人确认</span><i>→</i><span><b>04</b>准备投递</span>
                    </div>
                  </div>
                ) : (
                  <div className="assessment-mock">
                    <div><small>人格探索</small><strong>16</strong><span>倾向测评</span></div>
                    <i>×</i>
                    <div><small>传统文化</small><strong>八字</strong><span>专业排盘</span></div>
                  </div>
                )}
                <span className="project-number">{project.number}</span>
                <span className="project-status">{project.status.split(" · ")[0]}</span>
              </div>
              <div className="project-body">
                <span className="eyebrow">{project.eyebrow}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                {project.highlights && <ul className="project-highlights">
                  {project.highlights.map(item => <li key={item}>{item}</li>)}
                </ul>}
                <div className="tag-row">{project.stack.slice(0,3).map(tag => <span key={tag}>{tag}</span>)}</div>
                <button className="text-link" onClick={() => setActive(project)}>{index === 0 ? "产品介绍" : "查看案例"} <Arrow /></button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section capability-section" id="capabilities">
        <div className="section-heading light">
          <div><span className="section-index">02 / CAPABILITIES</span><h2>完整产品链路</h2></div>
          <p>作品的共同点，是从真实问题出发，最后形成可运行、可检查、可继续迭代的交付。</p>
        </div>
        <div className="capability-track">
          {[{n:"01",t:"需求判断",d:"把模糊想法拆成用户、场景和边界"},{n:"02",t:"产品与体验",d:"组织信息、流程、交互和视觉层级"},{n:"03",t:"AI工作流",d:"连接模型、规则、数据与人工决策"},{n:"04",t:"工程实现",d:"Web、桌面端、数据可视化与本地存储"},{n:"05",t:"验证交付",d:"构建、部署、全页质检和持续运行"}].map(item => (
            <div className="capability" key={item.n}><span>{item.n}</span><h3>{item.t}</h3><p>{item.d}</p></div>
          ))}
        </div>
      </section>

      <section className="section lab-section" id="lab">
        <div className="section-heading">
          <div><span className="section-index">03 / PRODUCT LAB</span><h2>更多实验</h2></div>
          <p>学习工具和内容型产品统一收进实验室，保留广度，但不抢核心案例的叙事重点。</p>
        </div>
        <div className="lab-grid">
          {labs.map((item, index) => item.href ? (
            <a href={item.href} target="_blank" rel="noreferrer" className="lab-card" key={item.title}>
              <span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.tag}</p></div><Arrow />
            </a>
          ) : (
            <div className="lab-card muted" key={item.title}>
              <span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.tag}</p></div><b>案例收录</b>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <div><span className="brand-mark"><img src="/favicon.svg" alt="" /></span><strong>AI PRODUCT LAB</strong></div>
        <p>产品合作与交流 · 13021857963 · 2026</p>
      </footer>

      {active && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setActive(null)}>
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={e => e.stopPropagation()}>
            <button className="modal-close" aria-label="关闭" onClick={() => setActive(null)}>×</button>
            <span className="eyebrow">{active.eyebrow}</span>
            <h2 id="modal-title">{active.title}</h2>
            <p className="modal-summary">{active.summary}</p>
            {active.gallery && <div className="modal-gallery">
              {active.gallery.map((image, index) => <figure key={image}>
                <img src={image} alt={`${active.title}界面 ${index + 1}`} />
                <figcaption>{["求职决策首页", "全网职位探索", "免费企业背调"][index]}</figcaption>
              </figure>)}
            </div>}
            <div className="modal-grid">
              <div><small>产品结果</small><p>{active.outcome}</p></div>
              <div><small>我的工作</small><p>{active.role}</p></div>
              <div><small>当前状态</small><p>{active.status}</p></div>
              <div><small>技术与方法</small><p>{active.stack.join(" · ")}</p></div>
            </div>
            <div className="modal-actions">
              {active.primary ? <a className="button primary" href={active.primary.href} target={active.primary.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{active.primary.label} <Arrow /></a> : <span className="button disabled">演示模式准备中</span>}
              {active.secondary && <a className="button bazi" href={active.secondary.href} target="_blank" rel="noreferrer">{active.secondary.label} <Arrow /></a>}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
