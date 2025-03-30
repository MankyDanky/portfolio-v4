import HyperdriveBackground from './components/HyperdriveBackground'

function App() {
  return (
    <>
      <HyperdriveBackground />
      
      <div className="min-h-screen bg-transparent text-white relative z-0">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-space-dark/80 backdrop-blur-sm z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-xl font-bold text-space-star">
              <span className="text-space-nebula">{'<'}</span>
              YourName
              <span className="text-space-nebula">{' />'}</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-space-star hover:text-space-accent transition-colors">Home</a>
              <a href="#projects" className="text-space-star hover:text-space-accent transition-colors">Projects</a>
              <a href="#about" className="text-space-star hover:text-space-accent transition-colors">About</a>
              <a href="#contact" className="text-space-star hover:text-space-accent transition-colors">Contact</a>
            </div>
            
            <button className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-space-star">Hello, I'm </span>
              <span className="text-space-accent">Your Name</span>
            </h1>
            <h2 className="text-2xl md:text-3xl mb-8 text-space-star/90">
              Developer • Designer • Creator
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-8 text-space-star/80">
              I build exceptional digital experiences that live at the intersection of design and technology.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-3 bg-space-accent text-white rounded-lg hover:bg-indigo-600 transition-colors">
                View My Work
              </button>
              <button className="px-6 py-3 border border-space-accent text-space-accent rounded-lg hover:bg-space-accent/10 transition-colors">
                Contact Me
              </button>
            </div>
          </div>
        </section>

        {/* Projects Section - Add your projects here */}
        <section id="projects" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="text-space-nebula">{'<'}</span>
              Projects
              <span className="text-space-nebula">{' />'}</span>
            </h2>
            
            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Add your project cards here */}
              {/* Example Project */}
              <div className="bg-space-primary rounded-xl overflow-hidden shadow-lg hover:shadow-space-accent/20 transition-all hover:-translate-y-1">
                <div className="h-48 bg-gray-700"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Project Name</h3>
                  <p className="text-space-star/70 mb-4">
                    Project description goes here. Explain what you did and the technologies you used.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-space-accent/20 text-space-accent px-2 py-1 rounded-full">React</span>
                    <span className="text-xs bg-space-accent/20 text-space-accent px-2 py-1 rounded-full">Three.js</span>
                    <span className="text-xs bg-space-accent/20 text-space-accent px-2 py-1 rounded-full">Tailwind</span>
                  </div>
                  <div className="flex space-x-4">
                    <a href="#" className="text-space-accent hover:text-space-nebula transition-colors">View Project</a>
                    <a href="#" className="text-space-accent hover:text-space-nebula transition-colors">Source Code</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;