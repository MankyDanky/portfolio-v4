import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import WaterBackground from './components/WaterBackground'
import IceKnight from './assets/IceKnight.png'
import InFind from './assets/InFind.png'
import SpaceSim from './assets/SpaceSim.png'
import WordWeaver from './assets/WordWeaver.png'
import ProfileImage from './assets/me.png'

function App() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: null,
    error: null
  });
  const form = useRef();

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: null, error: null });

    // Use the direct send method that works on the website
    emailjs.send(
      'service_21b7wod',
      'template_o38n3h6',   // Use the working template ID
      {
        user_name: formData.name,
        user_email: formData.email,
        message: formData.message,
        to_email: 'aadi.kulsh@gmail.com'
      },
      'FEFtbri70HOoEoCrE'
    )
      .then(() => {
        setFormStatus({
          submitting: false,
          success: 'Message sent successfully! I\'ll get back to you soon.',
          error: null
        });
        setFormData({ name: '', email: '', message: '' });
      }, (error) => {
        console.error("Email error:", error);
        setFormStatus({
          submitting: false,
          success: null,
          error: 'Something went wrong. Please try again later.'
        });
      });
  };

  return (
    <>
      <WaterBackground />
      
      {/* Dark overlay with blur for better readability */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-0 pointer-events-none"></div>
      
      <div className="min-h-screen bg-transparent text-white relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-space-dark/80 backdrop-blur-sm z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-xl font-bold text-space-star">
              <span className="text-space-nebula">{'<'}</span>
              Aadi Kulshrestha
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
              <span className="text-space-accent">Aadi Kulshrestha</span>
            </h1>
            <h2 className="text-2xl md:text-3xl mb-8 text-space-star/90">
              Full Stack Developer
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-8 text-space-star/80">
              I love building unique and interesting software!
            </p>
            <div className="flex justify-center space-x-4">
              {/* Updated buttons with anchor links */}
              <a href="#projects" className="px-6 py-3 bg-space-accent text-white rounded-lg hover:bg-indigo-600 transition-colors">
                View My Work
              </a>
              <a href="#contact" className="px-6 py-3 border border-space-accent text-space-accent rounded-lg hover:bg-space-accent/10 transition-colors">
                Contact Me
              </a>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="text-space-nebula">{'<'}</span>
              Projects
              <span className="text-space-nebula">{' />'}</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Word Weaver AI Project */}
              <div className="bg-space-primary rounded-xl overflow-hidden shadow-lg hover:shadow-space-accent/20 transition-all hover:-translate-y-1 flex flex-col h-full">
                <div className="h-48 bg-gray-700 overflow-hidden">
                  <img src={WordWeaver} alt="Word Weaver AI" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Word Weaver AI</h3>
                    <p className="text-space-star/70 mb-4">
                      A sophisticated AI-powered essay generation platform built with Next.js and TypeScript. 
                      Leverages Perplexity's cutting-edge Sonar model to incorporate real-time information and sources,
                      delivering academically rigorous content. Features an advanced multi-stage workflow that generates,
                      reviews, and refines essays through intelligent AI feedback loops.
                    </p>
                  </div>
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-space-accent/20 text-space-accent px-2 py-1 rounded-full">Next.js</span>
                      <span className="text-xs bg-space-accent/20 text-space-accent px-2 py-1 rounded-full">TypeScript</span>
                      <span className="text-xs bg-space-accent/20 text-space-accent px-2 py-1 rounded-full">MongoDB</span>
                      <span className="text-xs bg-space-accent/20 text-space-accent px-2 py-1 rounded-full">Perplexity AI</span>
                    </div>
                    <div className="flex space-x-4">
                      <a href="https://wordweaverai.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-space-accent hover:text-space-nebula transition-colors">View Demo</a>
                      <a href="https://github.com/MankyDanky/word-weaver" target="_blank" rel="noopener noreferrer" className="text-space-accent hover:text-space-nebula transition-colors">Source Code</a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* InFind Project */}
              <div className="bg-space-primary rounded-xl overflow-hidden shadow-lg hover:shadow-space-accent/20 transition-all hover:-translate-y-1 flex flex-col h-full">
                <div className="h-48 bg-gray-700 overflow-hidden">
                  <img src={InFind} alt="InFind" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">InFind</h3>
                    <p className="text-space-star/70 mb-4">
                      An innovative influencer discovery platform developed for the 2025 Dreamwell Hackathon. 
                      Integrates multiple social media APIs (YouTube, Facebook, Twitter) with OpenAI's language models
                      to deliver AI-powered brand partnership recommendations. Features sophisticated analytics to match
                      brands with ideal influencers based on audience demographics, engagement metrics, and content alignment.
                    </p>
                  </div>
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-space-accent/20 text-space-accent px-2 py-1 rounded-full">React</span>
                      <span className="text-xs bg-space-accent/20 text-space-accent px-2 py-1 rounded-full">Express</span>
                      <span className="text-xs bg-space-accent/20 text-space-accent px-2 py-1 rounded-full">Node.js</span>
                      <span className="text-xs bg-space-accent/20 text-space-accent px-2 py-1 rounded-full">TypeScript</span>
                    </div>
                    <div className="flex space-x-4">
                      <a href="https://github.com/MankyDanky/InFind" target="_blank" rel="noopener noreferrer" className="text-space-accent hover:text-space-nebula transition-colors">Source Code</a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* SpaceSim Project */}
              <div className="bg-space-primary rounded-xl overflow-hidden shadow-lg hover:shadow-space-accent/20 transition-all hover:-translate-y-1 flex flex-col h-full">
                <div className="h-48 bg-gray-700 overflow-hidden">
                  <img src={SpaceSim} alt="SpaceSim" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">SpaceSim</h3>
                    <p className="text-space-star/70 mb-4">
                      A physically accurate solar system simulation engineered with C++ and OpenGL. 
                      Implements advanced graphics techniques including custom-built bloom post-processing, 
                      HDR rendering, and physically-based shading. Features scientifically accurate 
                      planetary scaling, orbital mechanics, and celestial body rendering with an intuitive 
                      IMGUI-powered interface for exploration control.
                    </p>
                  </div>
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-space-accent/20 text-space-accent px-2 py-1 rounded-full">C++</span>
                      <span className="text-xs bg-space-accent/20 text-space-accent px-2 py-1 rounded-full">OpenGL</span>
                      <span className="text-xs bg-space-accent/20 text-space-accent px-2 py-1 rounded-full">GLSL</span>
                      <span className="text-xs bg-space-accent/20 text-space-accent px-2 py-1 rounded-full">IMGUI</span>
                    </div>
                    <div className="flex space-x-4">
                      <a href="https://github.com/MankyDanky/SpaceSim" target="_blank" rel="noopener noreferrer" className="text-space-accent hover:text-space-nebula transition-colors">Source Code</a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Ice Knight Project */}
              <div className="bg-space-primary rounded-xl overflow-hidden shadow-lg hover:shadow-space-accent/20 transition-all hover:-translate-y-1 flex flex-col h-full">
                <div className="h-48 bg-gray-700 overflow-hidden">
                  <img src={IceKnight} alt="Ice Knight" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Ice Knight</h3>
                    <p className="text-space-star/70 mb-4">
                      A visually striking 2D dungeon crawler developed in Unity with C#. 
                      Features sophisticated procedural level generation using advanced algorithms for 
                      endless, unique gameplay experiences. Implements custom lighting using Unity's 
                      Universal Render Pipeline (URP) with dynamic shadows, volumetric fog, and 
                      atmospheric particle effects that create an immersive fantasy environment.
                    </p>
                  </div>
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-space-accent/20 text-space-accent px-2 py-1 rounded-full">C#</span>
                      <span className="text-xs bg-space-accent/20 text-space-accent px-2 py-1 rounded-full">Unity</span>
                      <span className="text-xs bg-space-accent/20 text-space-accent px-2 py-1 rounded-full">URP</span>
                      <span className="text-xs bg-space-accent/20 text-space-accent px-2 py-1 rounded-full">Procedural Generation</span>
                    </div>
                    <div className="flex space-x-4">
                      <a href="https://mankydanky.itch.io/ice-knight" target="_blank" rel="noopener noreferrer" className="text-space-accent hover:text-space-nebula transition-colors">
                        View Demo
                      </a>
                      <a href="https://github.com/MankyDanky/Ice-Knight" target="_blank" rel="noopener noreferrer" className="text-space-accent hover:text-space-nebula transition-colors">
                        Source Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-space-dark/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="text-space-nebula">{'<'}</span>
              About Me
              <span className="text-space-nebula">{' />'}</span>
            </h2>
            
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Profile Image */}
              <div className="w-full lg:w-1/3 flex justify-center">
                <div className="w-64 h-64 rounded-full bg-space-accent/20 border-2 border-space-accent overflow-hidden">
                  <img 
                    src={ProfileImage} 
                    alt="Aadi Kulshrestha" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* About Content */}
              <div className="w-full lg:w-2/3">
                <h3 className="text-2xl font-semibold mb-4 text-space-star">My Journey</h3>
                <p className="text-space-star/80 mb-6 leading-relaxed">
                  I'm a passionate full-stack developer with expertise in building modern web applications.
                  With a background in both front-end and back-end technologies, I love creating elegant 
                  solutions that solve real-world problems. My journey began with a curiosity about game development, which evolved into a deep fascination with software engineering as a whole.
                </p>
                
                <h3 className="text-2xl font-semibold mb-4 text-space-star">Skills & Technologies</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                  {/* Frontend */}
                  <div className="bg-space-primary rounded-lg p-3 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-space-accent mr-2"></div>
                    <span>JavaScript</span>
                  </div>
                  <div className="bg-space-primary rounded-lg p-3 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-space-accent mr-2"></div>
                    <span>TypeScript</span>
                  </div>
                  <div className="bg-space-primary rounded-lg p-3 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-space-accent mr-2"></div>
                    <span>React</span>
                  </div>
                  <div className="bg-space-primary rounded-lg p-3 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-space-accent mr-2"></div>
                    <span>Next.js</span>
                  </div>
                  <div className="bg-space-primary rounded-lg p-3 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-space-accent mr-2"></div>
                    <span>CSS/Tailwind</span>
                  </div>
                  <div className="bg-space-primary rounded-lg p-3 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-space-accent mr-2"></div>
                    <span>Three.js</span>
                  </div>
                  
                  {/* Backend */}
                  <div className="bg-space-primary rounded-lg p-3 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-space-accent mr-2"></div>
                    <span>Node.js</span>
                  </div>
                  <div className="bg-space-primary rounded-lg p-3 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-space-accent mr-2"></div>
                    <span>Django</span>
                  </div>
                  <div className="bg-space-primary rounded-lg p-3 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-space-accent mr-2"></div>
                    <span>FastAPI</span>
                  </div>
                  <div className="bg-space-primary rounded-lg p-3 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-space-accent mr-2"></div>
                    <span>Spring</span>
                  </div>
                  
                  {/* Programming Languages */}
                  <div className="bg-space-primary rounded-lg p-3 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-space-accent mr-2"></div>
                    <span>Python</span>
                  </div>
                  <div className="bg-space-primary rounded-lg p-3 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-space-accent mr-2"></div>
                    <span>Java</span>
                  </div>
                  <div className="bg-space-primary rounded-lg p-3 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-space-accent mr-2"></div>
                    <span>C/C++</span>
                  </div>
                  <div className="bg-space-primary rounded-lg p-3 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-space-accent mr-2"></div>
                    <span>C#</span>
                  </div>
                  
                  {/* Frameworks & Technologies */}
                  <div className="bg-space-primary rounded-lg p-3 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-space-accent mr-2"></div>
                    <span>TensorFlow</span>
                  </div>
                  <div className="bg-space-primary rounded-lg p-3 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-space-accent mr-2"></div>
                    <span>QT</span>
                  </div>
                  <div className="bg-space-primary rounded-lg p-3 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-space-accent mr-2"></div>
                    <span>OpenGL</span>
                  </div>
                  <div className="bg-space-primary rounded-lg p-3 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-space-accent mr-2"></div>
                    <span>.NET</span>
                  </div>
                  <div className="bg-space-primary rounded-lg p-3 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-space-accent mr-2"></div>
                    <span>Blazor</span>
                  </div>
                  <div className="bg-space-primary rounded-lg p-3 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-space-accent mr-2"></div>
                    <span>Unity</span>
                  </div>
                </div>
                
                <p className="text-space-star/80 leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, studying for exams, or playing with my dog. I'm always eager to learn and take on new challenges.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="text-space-nebula">{'<'}</span>
              Contact
              <span className="text-space-nebula">{' />'}</span>
            </h2>
            
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Contact Form */}
              <div className="w-full lg:w-1/2">
                <div className="bg-space-primary rounded-xl p-8 shadow-lg hover:shadow-space-accent/10 transition-all">
                  <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
                  
                  <form ref={form} onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-space-star/80 mb-2">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="user_name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-space-dark/80 border border-space-accent/20 rounded-lg px-4 py-3 focus:outline-none focus:border-space-accent transition-colors text-white"
                        placeholder="Your Name" 
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-space-star/80 mb-2">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="user_email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-space-dark/80 border border-space-accent/20 rounded-lg px-4 py-3 focus:outline-none focus:border-space-accent transition-colors text-white"
                        placeholder="your.email@example.com" 
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="message" className="block text-space-star/80 mb-2">Message</label>
                      <textarea 
                        id="message" 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className="w-full bg-space-dark/80 border border-space-accent/20 rounded-lg px-4 py-3 focus:outline-none focus:border-space-accent transition-colors text-white resize-none"
                        placeholder="Your message here..." 
                        required
                      ></textarea>
                    </div>
                    
                    {formStatus.success && (
                      <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-300">
                        {formStatus.success}
                      </div>
                    )}
                    
                    {formStatus.error && (
                      <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
                        {formStatus.error}
                      </div>
                    )}
                    
                    <button 
                      type="submit" 
                      disabled={formStatus.submitting}
                      className={`bg-space-accent hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition-colors w-full ${formStatus.submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {formStatus.submitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="w-full lg:w-1/2">
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-6 text-space-star">Connect With Me</h3>
                  <p className="text-space-star/80 mb-6">
                    I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-space-accent/20 rounded-full flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-space-star">aadi.kulsh@gmail.com</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-space-accent/20 rounded-full flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="text-space-star">Waterloo, ON, CA</span>
                    </div>
                  </div>
                </div>
                
                {/* Social Links */}
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-space-star">Follow Me</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/MankyDanky" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 bg-space-accent/20 hover:bg-space-accent/40 rounded-full flex items-center justify-center transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/aadi-kulshrestha" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 bg-space-accent/20 hover:bg-space-accent/40 rounded-full flex items-center justify-center transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 bg-space-dark">
          <div className="container mx-auto px-4 text-center text-space-star/60">
            <p>© {new Date().getFullYear()} Aadi Kulshrestha. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;