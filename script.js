const PHASES = ['plan', 'do', 'check', 'act'];

const content = {
    plan: {
        title: "PLAN 计划",
        desc: "确定质量目标、制定流程、分析问题与资源配置。"
    },
    do: {
        title: "DO 执行",
        desc: "按照计划实施流程并收集运行数据。"
    },
    check: {
        title: "CHECK 检查",
        desc: "分析结果并评估目标是否达成。"
    },
    act: {
        title: "ACT 处理",
        desc: "标准化成功经验并持续改善。"
    }
};

class PDCAController {
    constructor() {
        this.currentPhase = 'plan';
        this.init();
    }

    init() {
        this.elements = {
            title: document.getElementById('title'),
            desc: document.getElementById('desc'),
            segments: document.querySelectorAll('.segment'),
            navBtns: document.querySelectorAll('.nav-btn'),
            labels: document.querySelectorAll('.label')
        };

        this.setupEventListeners();
        this.setPhase('plan');
    }

    setupEventListeners() {
        // SVG 点击事件
        this.elements.segments.forEach(segment => {
            segment.addEventListener('click', () => {
                const phase = segment.dataset.phase;
                this.setPhase(phase);
            });

            segment.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const phase = segment.dataset.phase;
                    this.setPhase(phase);
                }
            });
        });

        // 导航按钮点击事件
        this.elements.navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const phase = btn.dataset.phase;
                this.setPhase(phase);
            });
        });

        // 键盘导航
        document.addEventListener('keydown', (e) => {
            const key = e.key.toUpperCase();
            if (['P', 'D', 'C', 'A'].includes(key)) {
                const phaseMap = { 'P': 'plan', 'D': 'do', 'C': 'check', 'A': 'act' };
                this.setPhase(phaseMap[key]);
            }
        });

        // 自动循环 (可选)
        // setInterval(() => this.nextPhase(), 5000);
    }

    setPhase(phase) {
        if (!PHASES.includes(phase)) return;

        this.currentPhase = phase;

        // 更新文本
        this.elements.title.textContent = content[phase].title;
        this.elements.desc.textContent = content[phase].desc;

        // 更新样式
        this.elements.segments.forEach(seg => {
            seg.classList.toggle('active', seg.dataset.phase === phase);
        });

        this.elements.navBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.phase === phase);
        });

        // 添加过渡动画
        this.elements.title.style.animation = 'none';
        setTimeout(() => {
            this.elements.title.style.animation = '';
        }, 10);
    }

    nextPhase() {
        const currentIndex = PHASES.indexOf(this.currentPhase);
        const nextIndex = (currentIndex + 1) % PHASES.length;
        this.setPhase(PHASES[nextIndex]);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new PDCAController();
});