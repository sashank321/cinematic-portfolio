export interface ProjectType {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  overview: string;
  problem: string;
  research: string;
  process: string;
  decisions: string;
  development: string;
  challenges: string;
  result: string;
  technologies: string[];
  learnings: string;
}

export const PROJECTS_DATA: ProjectType[] = [
  {
    id: "advertising-sales-analysis",
    number: "01",
    title: "Advertising Sales Analysis",
    category: "Data Science & Analytics",
    year: "2024",
    image: "/images/architecture.png",
    description: "Analyzing advertising performance across channels using statistical modeling to optimize ROI.",
    overview: "This project focused on analyzing large datasets to determine the most effective advertising channels. By leveraging statistical modeling and data visualization, the goal was to uncover hidden patterns that drive conversion.",
    problem: "Sales data is often siloed and difficult to interpret without statistical context. Identifying which ad spend directly correlates with sales requires rigorous cleaning and correlation analysis.",
    research: "I reviewed common regression techniques and time-series analysis methods to understand the lag between advertising spend and actual revenue generation.",
    process: "Using Python and Jupyter Notebooks, I performed data wrangling, exploratory data analysis (EDA), and built predictive models to forecast sales based on ad budgets.",
    decisions: "I chose to visualize the findings using clean, minimalist charts that prioritize data-ink ratios, ensuring that the insights were immediately apparent to non-technical stakeholders.",
    development: "Developed primarily in Python using Pandas, NumPy, Scikit-learn, and Matplotlib/Seaborn for visualization.",
    challenges: "Handling missing values and outliers in the dataset without skewing the predictive model required careful imputation strategies.",
    result: "The analysis successfully identified the top-performing channels, providing actionable recommendations to optimize future marketing budgets.",
    technologies: ["Python", "Pandas", "Scikit-Learn", "Matplotlib", "Jupyter"],
    learnings: "Data storytelling is just as important as the mathematical model. Clean visuals and clear insights make the data actionable.",
  },
  {
    id: "college-website-redesign",
    number: "02",
    title: "College Website Redesign",
    category: "Frontend & UX/UI",
    year: "2025",
    image: "/images/fabric.png",
    description: "Transforming a dated university portal into a fluid, accessible digital experience.",
    overview: "The college website redesign aimed to modernize the digital face of the institution. The project involved rethinking the information architecture and implementing a fresh, accessible design system.",
    problem: "The original site was cluttered, difficult to navigate, and not mobile-responsive, leading to a frustrating experience for prospective students and current faculty.",
    research: "I conducted user interviews with students and analyzed the pain points in the existing navigation flow, focusing on how quickly users could find essential resources like course catalogs and admissions info.",
    process: "Starting with low-fidelity wireframes in Figma, I moved to high-fidelity prototypes and then implemented the frontend using modern web frameworks.",
    decisions: "Adopted a mobile-first approach and a strict grid system to ensure consistency. Used a clean, high-contrast color palette to meet accessibility standards.",
    development: "Built with React and Tailwind CSS, utilizing component-driven architecture to make the codebase maintainable and scalable.",
    challenges: "Restructuring a massive amount of legacy content into a simplified, intuitive navigation menu without losing important links.",
    result: "A sleek, responsive portal that significantly reduced bounce rates and improved user satisfaction scores.",
    technologies: ["React", "Tailwind CSS", "Figma", "JavaScript"],
    learnings: "Good design is about removing the unnecessary so that the necessary may speak.",
  },
  {
    id: "java-applications",
    number: "03",
    title: "Java Applications",
    category: "Backend & Systems",
    year: "2023",
    image: "/images/interior.png",
    description: "Robust object-oriented applications demonstrating core software engineering principles.",
    overview: "This project encompasses a suite of Java-based applications built to solve specific algorithmic and system-level problems, emphasizing clean architecture and efficient resource management.",
    problem: "Building scalable backend logic requires a deep understanding of object-oriented design patterns, memory management, and data structures.",
    research: "I studied advanced Java concepts, including multithreading, garbage collection optimization, and design patterns like Singleton, Factory, and Observer.",
    process: "Each application was planned with UML diagrams before implementation, ensuring a solid architectural foundation before writing code.",
    decisions: "Strict adherence to SOLID principles was maintained throughout development to ensure code reusability and ease of testing.",
    development: "Written in pure Java, utilizing Maven for dependency management and JUnit for rigorous unit testing.",
    challenges: "Handling complex concurrency issues and ensuring thread safety in multi-threaded applications.",
    result: "A portfolio of highly performant, well-documented Java applications that run reliably under load.",
    technologies: ["Java", "Maven", "JUnit", "OOP"],
    learnings: "Strong foundational knowledge in systems programming and object-oriented design is critical for building reliable software at scale.",
  },
  {
    id: "machine-learning",
    number: "04",
    title: "Machine Learning Models",
    category: "AI & Predictive Modeling",
    year: "2025",
    image: "/images/architecture.png",
    description: "Neural networks and predictive algorithms for classification and regression tasks.",
    overview: "This ongoing project involves designing, training, and deploying various machine learning models to tackle real-world datasets, ranging from natural language processing to computer vision.",
    problem: "Raw data holds immense potential, but extracting predictive value requires carefully tuned algorithms and robust evaluation metrics.",
    research: "Deep dived into deep learning architectures (CNNs, RNNs) and optimization algorithms (Adam, SGD) to understand the mechanics of model convergence.",
    process: "Data preprocessing was followed by model selection, hyperparameter tuning via grid search, and final evaluation using cross-validation.",
    decisions: "Leveraged PyTorch for deep learning tasks due to its dynamic computational graph, which allowed for easier debugging and experimentation.",
    development: "Developed using Python, PyTorch, and TensorFlow. Models were trained on cloud GPU instances to accelerate the iteration cycle.",
    challenges: "Mitigating overfitting on smaller datasets required implementing advanced regularization techniques like dropout and data augmentation.",
    result: "Successfully deployed models with high accuracy metrics, demonstrating practical application of AI concepts.",
    technologies: ["Python", "PyTorch", "TensorFlow", "Scikit-Learn"],
    learnings: "The quality of the data is just as crucial as the complexity of the model. Garbage in, garbage out.",
  },
  {
    id: "portfolio-website",
    number: "05",
    title: "This Portfolio",
    category: "Frontend Architecture",
    year: "2026",
    image: "/images/fabric.png",
    description: "An interactive engineering experience — particle systems, GSAP choreography, and editorial design.",
    overview: "The goal was to move beyond templates and build an interactive experience that tells a story with every scroll.",
    problem: "Standard portfolios lack emotional resonance. The challenge was to create an interface that surprises users while remaining highly performant.",
    research: "Analyzed award-winning sites from Awwwards and FWA, studying animation timing, typography systems, and scroll choreography.",
    process: "Built from scratch using Next.js, with custom canvas particle systems, GSAP scroll-driven animations, and Lenis inertial scrolling.",
    decisions: "Opted for optimized DOM/canvas animations over heavy WebGL to ensure performance across all devices.",
    development: "Engineered with Next.js App Router, Tailwind CSS v4, GSAP ScrollTrigger, and custom canvas renderers.",
    challenges: "Choreographing complex timeline animations without causing layout thrashing or accessibility issues during scroll.",
    result: "A highly polished interactive experience that communicates engineering craftsmanship.",
    technologies: ["Next.js", "TypeScript", "GSAP", "Canvas", "Lenis"],
    learnings: "Restraint is elegance. It's not about how many effects you add, but how harmoniously they work together.",
  },
];
