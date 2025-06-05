"use client"

import { useState, useEffect } from "react"
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Code,
  Server,
  Database,
  Globe,
  Container,
  Palette,
  ExternalLink,
  Send,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  FileText,
  Smartphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import SimpleBackground from "@/components/simple-background"
import Image from 'next/image';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [projects, setProjects] = useState<any[]>([])
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  // Adicione este estado para controlar as animações
  const [skillsVisible, setSkillsVisible] = useState(false)

  // Testimonials data
  const testimonials = [
    {
      name: "Ana Silva",
      role: "CTO - TechStart Solutions",
      company: "TechStart Solutions",
      content:
        "Maxwell desenvolveu nossa plataforma de e-commerce do zero usando Laravel e Vue.js. Sua expertise técnica e atenção aos detalhes resultaram em uma solução robusta e escalável que superou nossas expectativas.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Carlos Mendes",
      role: "Gerente de Projetos - Digital Corp",
      company: "Digital Corp",
      content:
        "Trabalhar com Maxwell foi excepcional. Ele entregou nossa API RESTful complexa no prazo, com documentação impecável e testes abrangentes. Sua comunicação clara tornou todo o processo muito tranquilo.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Mariana Costa",
      role: "Product Owner - InnovaTech",
      company: "InnovaTech",
      content:
        "Maxwell transformou nossa visão em realidade. O dashboard analytics que ele criou com Vue.js e Laravel é intuitivo, rápido e fornece insights valiosos para nosso negócio. Recomendo fortemente!",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Roberto Santos",
      role: "CEO - StartupBrasil",
      company: "StartupBrasil",
      content:
        "A implementação do Docker em nosso ambiente de desenvolvimento por Maxwell revolucionou nosso workflow. Agora temos deploys consistentes e um ambiente de desenvolvimento muito mais eficiente.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "sobre", "habilidades", "projetos", "depoimentos", "contato"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getDemoUrl = (repoName: string) => {
    if (repoName === "Monitor-Dolar-Ptax") {
      return "https://luxury-sunshine-ac8703.netlify.app/"
    }
    if (repoName === "Projeto-Coffe-Break") {
      return "https://coffee-break.netlify.app/"
    }
    return "#"
  }

  useEffect(() => {
    const fetchGitHubProjects = async () => {
      try {
        const projectNames = ["Monitor-Dolar-Ptax", "Projeto-Coffe-Break"]
        const projectPromises = projectNames.map((name) =>
          fetch(`https://api.github.com/repos/psyker23k/${name}`).then((res) => res.json()),
        )

        const githubProjects = await Promise.all(projectPromises)

        // Mapear os dados do GitHub para o formato do seu portfólio
        const formattedProjects = githubProjects.map((repo) => ({
          title: repo.name.replace(/-/g, " "),
          description: repo.description || "Projeto desenvolvido com tecnologias modernas",
          tech: getTechFromRepo(repo),
          github: repo.html_url,
          demo: getDemoUrl(repo.name), // Nova função para pegar a URL correta
          image: `/placeholder.svg?height=200&width=300`,
          language: repo.language,
          updated: new Date(repo.updated_at).toLocaleDateString("pt-BR"),
        }))

        setProjects(formattedProjects)
      } catch (error) {
        console.error("Erro ao buscar projetos:", error)
        // Fallback para projetos estáticos em caso de erro
        setProjects([
          {
            title: "Monitor Dólar Ptax",
            description: "Sistema de monitoramento da cotação do dólar com dados em tempo real do Banco Central.",
            tech: ["PHP", "JavaScript", "API", "Bootstrap"],
            github: "https://github.com/psyker23k/Monitor-Dolar-Ptax",
            demo: "https://luxury-sunshine-ac8703.netlify.app/",
            image: "/placeholder.svg?height=200&width=300",
          },
          {
            title: "Projeto Coffee Break",
            description: "Aplicação web para gerenciamento de cafeteria com sistema de pedidos e controle de estoque.",
            tech: ["PHP", "MySQL", "CSS", "JavaScript"],
            github: "https://github.com/psyker23k/Projeto-Coffe-Break",
            demo: "https://coffee-break.netlify.app/",
            image: "/placeholder.svg?height=200&width=300",
          },
        ])
      } finally {
        setIsLoadingProjects(false)
      }
    }

    fetchGitHubProjects()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const skills = [
    { name: "PHP", icon: Code, level: 95, color: "bg-blue-500" },
    { name: "Laravel", icon: Server, level: 90, color: "bg-cyan-500" },
    { name: "Vue.js", icon: Globe, level: 85, color: "bg-teal-500" },
    { name: "Tailwind CSS", icon: Palette, level: 90, color: "bg-sky-500" },
    { name: "Docker", icon: Container, level: 80, color: "bg-indigo-500" },
    { name: "MySQL", icon: Database, level: 85, color: "bg-blue-600" },
  ]

  const getTechFromRepo = (repo: any) => {
    const techs = []

    if (repo.language) techs.push(repo.language)

    // Adicionar tecnologias baseadas no nome do projeto
    if (repo.name.includes("Monitor-Dolar")) {
      techs.push("API", "Bootstrap", "Banco Central")
    }
    if (repo.name.includes("Coffe-Break")) {
      techs.push("MySQL", "CSS", "Sistema de Pedidos")
    }

    // Garantir que sempre tenha pelo menos algumas tecnologias
    if (techs.length === 0) {
      techs.push("PHP", "JavaScript", "CSS")
    }

    return techs
  }

  // Adicione este useEffect para detectar quando a seção de habilidades está visível
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSkillsVisible(true)
          }
        })
      },
      { threshold: 0.3 },
    )

    const skillsSection = document.getElementById("habilidades")
    if (skillsSection) {
      observer.observe(skillsSection)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-black relative">
      {/* Simple Background */}
      <SimpleBackground />

      {/* Static Nebula Background Effect */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/20 backdrop-blur-md z-50 border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-white tracking-wide">
              Maxwell<span className="text-cyan-400 font-light">Felipe</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {["inicio", "sobre", "habilidades", "projetos", "contato"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors duration-300 font-medium tracking-wide hover:scale-105 ${
                    activeSection === item ? "text-cyan-400" : "text-white hover:text-cyan-300"
                  }`}
                >
                  {item === "inicio" ? "Início" : item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white hover:scale-110" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-blue-500/20">
              {["inicio", "sobre", "habilidades", "projetos", "contato"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-2 text-white hover:text-cyan-300 capitalize font-medium"
                >
                  {item === "inicio" ? "Início" : item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-4xl font-bold text-white hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/25 relative overflow-hidden">
              <Image
                src="/images/foto.jpeg"
                alt="Foto de perfil de Maxwell Felipe"
                fill
                sizes="128px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">Maxwell Felipe</h1>
            <h2 className="text-2xl md:text-3xl text-cyan-300 mb-6 font-light tracking-wide">
              Desenvolvedor Fullstack PHP
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="px-4 py-2 bg-blue-600/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                PHP & Laravel
              </span>
              <span className="px-4 py-2 bg-green-600/20 text-green-300 rounded-full text-sm font-medium border border-green-500/30">
                Vue.js
              </span>
              <span className="px-4 py-2 bg-purple-600/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
                Docker
              </span>
              <span className="px-4 py-2 bg-cyan-600/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30">
                MySQL
              </span>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
              Transformando ideias em soluções digitais robustas com PHP, Laravel e Vue.js. Especialista em arquiteturas
              escaláveis e experiências de usuário excepcionais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection("projetos")}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg font-medium tracking-wide hover:scale-105 transition-transform shadow-lg shadow-cyan-600/25"
              >
                Ver Projetos
              </Button>
              <Button
                onClick={() => scrollToSection("contato")}
                variant="outline"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-8 py-3 text-lg font-medium tracking-wide hover:scale-105 transition-transform"
              >
                Entre em Contato
              </Button>
            </div>
          </div>
          <div className="animate-bounce">
            <ChevronDown className="mx-auto text-white" size={32} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16 tracking-tight">
            Sobre <span className="text-cyan-400 font-light">Mim</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-full h-96 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-6xl font-bold text-white hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                <Image
                  src="/images/about.jpg"
                  alt="Foto de perfil de Maxwell Felipe"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
            <div className="text-gray-300 space-y-6">
              <p className="text-lg leading-relaxed font-light">
                Sou Desenvolvedor Web Pleno com mais de 4 anos de experiência na criação de sistemas web robustos e escaláveis. Especialista em PHP com Laravel e banco de dados MySQL, atuo em todas as etapas do desenvolvimento — do back-end ao front-end — utilizando Vue.js, Tailwind CSS e boas práticas de código limpo.
              </p>
              <p className="text-lg leading-relaxed font-light">
                Tenho vivência sólida em ambientes corporativos e públicos, como no Exército Brasileiro, onde desenvolvi aplicações internas com foco em performance, segurança e integração com APIs REST. Trabalho com metodologias ágeis (Scrum), versionamento com Git e automação com Docker e AWS para garantir eficiência nos deploys e consistência nos ambientes de desenvolvimento.
              </p>
              <p className="text-lg leading-relaxed font-light">
                Apaixonado por tecnologia, estou sempre em busca de evoluir minhas habilidades, acompanhando as tendências do mercado para entregar soluções modernas, funcionais e de alta qualidade.
              </p>
              <div className="flex space-x-4 pt-4">
                <a
                  href="https://linkedin.com/in/maxwell-felipe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors hover:scale-125"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://github.com/psyker23k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors hover:scale-125"
                >
                  <Github size={24} />
                </a>
                <a
                  href="/images/Curriculo.pdf"
                  download
                  className="text-cyan-400 hover:text-cyan-300 transition-colors hover:scale-125"
                  aria-label="Baixar Currículo"
                >
                  <FileText size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="habilidades" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16 tracking-tight">
            Minhas <span className="text-cyan-400 font-light">Habilidades</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="hover:-translate-y-2 transition-transform duration-300"
                style={{
                  animation: skillsVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : "none",
                }}
              >
                <Card className="bg-slate-800/30 border-blue-500/20 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div
                        className={`p-3 rounded-lg ${skill.color} mr-4 hover:rotate-12 transition-transform group-hover:scale-110`}
                      >
                        <skill.icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-xl font-semibold text-white tracking-wide">{skill.name}</h3>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-3 mb-2 overflow-hidden">
                      <div
                        className={`h-3 rounded-full ${skill.color} transition-all duration-2000 ease-out`}
                        style={{
                          width: skillsVisible ? `${skill.level}%` : "0%",
                          boxShadow: skillsVisible
                            ? `0 0 10px ${skill.color.includes("blue") ? "#3b82f6" : "#06b6d4"}40`
                            : "none",
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-400 text-sm font-light">{skill.level}% de proficiência</p>
                      <div className="flex items-center text-cyan-400 text-sm">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
                        Ativo
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16 tracking-tight">
            Meus <span className="text-cyan-400 font-light">Projetos</span>
          </h2>

          {isLoadingProjects ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
              <span className="ml-4 text-gray-300">Carregando projetos do GitHub...</span>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {projects.map((project, index) => (
                <div key={index} className="hover:-translate-y-2 transition-transform duration-300">
                  <Card className="bg-slate-800/30 border-blue-500/20 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 group overflow-hidden h-full">
                    <div className="relative overflow-hidden">
                      <div className="w-full h-48 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">{project.title.includes("Monitor") ? "💱" : "☕"}</div>
                          <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-white font-semibold tracking-wide">{project.title}</CardTitle>
                      <CardDescription className="text-gray-300 font-light">{project.description}</CardDescription>
                      {project.updated && <p className="text-xs text-gray-500">Atualizado em: {project.updated}</p>}
                    </CardHeader>

                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech: string, techIndex: number) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-cyan-600/20 text-cyan-300 rounded-full text-sm font-medium hover:scale-110 hover:bg-cyan-600/40 transition-all"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex space-x-4">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors font-medium hover:scale-110"
                        >
                          <Github size={16} className="mr-1" />
                          Código
                        </a>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors font-medium hover:scale-110"
                        >
                          <ExternalLink size={16} className="mr-1" />
                          Demo
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <a
              href="https://github.com/psyker23k"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-slate-800/30 border border-cyan-400/30 rounded-lg text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 hover:scale-105"
            >
              <Github size={20} className="mr-2" />
              Ver todos os projetos no GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}

      {/* Contact Section */}
      <section id="contato" className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16 tracking-tight">
            Entre em <span className="text-cyan-400 font-light">Contato</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6 tracking-wide">Vamos conversar!</h3>
              <p className="text-gray-300 mb-8 font-light leading-relaxed">
                Estou sempre aberto a novas oportunidades e projetos interessantes. Entre em contato comigo para
                discutirmos como posso ajudar a transformar suas ideias em realidade.
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300 font-light hover:translate-x-2 transition-transform">
                  <Mail className="mr-3 text-cyan-400" size={20} />
                  maxfelipinho@gmail.com
                </div>
                <div className="flex items-center text-gray-300 font-light hover:translate-x-2 transition-transform">
                  <MapPin className="mr-3 text-cyan-400" size={20} />
                  Novo Gama, GO
                </div>
                <div className="flex items-center text-gray-300 font-light hover:translate-x-2 transition-transform">
                  <Smartphone className="mr-3 text-cyan-400" size={20} />
                  (61)99974-2815
                </div>
              </div>
              <div className="flex space-x-4 mt-8">
                <a
                  href="https://linkedin.com/in/maxwell-felipe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white transition-all hover:scale-110"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://github.com/psyker23k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white transition-all hover:scale-110"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://wa.me/5561999742815"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white transition-all hover:scale-110"
                  aria-label="Enviar mensagem no WhatsApp"
                >
                  <Smartphone size={20} />
                </a>
              </div>
            </div>
            <div>
              <Card className="bg-slate-800/30 border-blue-500/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <form action="https://formsubmit.co/maxfelipinho@gmail.com" method="POST" target="_blank" className="space-y-6">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Seu nome"
                      className="bg-slate-800/50 border-blue-500/30 text-white placeholder:text-gray-400 font-light"
                      required
                    />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Seu email"
                      className="bg-slate-800/50 border-blue-500/30 text-white placeholder:text-gray-400 font-light"
                      required
                    />
                    <Input
                      type="text"
                      name="subject"
                      placeholder="Assunto"
                      className="bg-slate-800/50 border-blue-500/30 text-white placeholder:text-gray-400 font-light"
                      required
                    />
                    <Textarea
                      name="message"
                      placeholder="Sua mensagem"
                      rows={5}
                      className="bg-slate-800/50 border-blue-500/30 text-white placeholder:text-gray-400 font-light"
                      required
                    />
                    <input type="hidden" name="_captcha" value="false" />
                    <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium tracking-wide hover:scale-105 transition-transform">
                      <Send size={16} className="mr-2" />
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-blue-500/20 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 font-light">© 2024 Maxwell Felipe. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
