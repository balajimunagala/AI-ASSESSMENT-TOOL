import { Link } from "react-router-dom"
import { Button } from "../components/ui-stubs"
import {
  Code2,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Users,
  Zap,
  Shield,
  Clock,
  Star,
} from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "Real Coding Environment",
    description:
      "Give candidates a real IDE experience with syntax highlighting, autocomplete, and live execution.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Track performance metrics, compare candidates, and make data-driven hiring decisions.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Share assessments, review submissions together, and standardize your hiring process.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Automated test cases run instantly, giving you immediate feedback on candidate performance.",
  },
  {
    icon: Shield,
    title: "Anti-Cheating Measures",
    description:
      "Browser lockdown, plagiarism detection, and activity monitoring ensure assessment integrity.",
  },
  {
    icon: Clock,
    title: "Time-Boxed Assessments",
    description:
      "Set custom time limits and track how candidates manage their time during tests.",
  },
]

const stats = [
  { value: "10,000+", label: "Candidates Assessed" },
  { value: "500+", label: "Companies Trust Us" },
  { value: "95%", label: "Hiring Accuracy" },
  { value: "50%", label: "Time Saved" },
]

const testimonials = [
  {
    quote:
      "CodeAssess transformed our hiring process. We now identify top talent 3x faster than before.",
    author: "Sarah Chen",
    role: "VP of Engineering",
    company: "TechCorp",
  },
  {
    quote:
      "The analytics and insights help us make objective hiring decisions. Highly recommended.",
    author: "Marcus Johnson",
    role: "CTO",
    company: "StartupXYZ",
  },
  {
    quote:
      "Finally, a platform that gives candidates a real coding experience. Our offer acceptance rate improved significantly.",
    author: "Emily Rodriguez",
    role: "Head of Talent",
    company: "ScaleUp Inc",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
                <Code2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">CodeAssess</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link
                to="#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                to="#pricing"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
              <Link
                to="#testimonials"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Testimonials
              </Link>
              <Link
                to="/dashboard"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild className="hidden sm:inline-flex">
                <Link to="/dashboard">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              <span>Trusted by 500+ companies worldwide</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
              Hire the best
              <br />
              <span className="text-primary">developers</span>, faster
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
              The modern technical assessment platform that helps you identify
              top engineering talent with real coding challenges, automated
              evaluation, and actionable insights.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/dashboard">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/test">Try Demo Assessment</Link>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                14-day free trial
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-card/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to hire better
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete platform for creating, administering, and evaluating
              technical assessments at scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-border bg-card hover:bg-card/80 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 md:py-32 bg-card/50 border-y border-border"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by engineering teams
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our customers have to say about their experience with
              CodeAssess.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author}
                className="p-6 rounded-xl border border-border bg-background"
              >
                <p className="text-foreground mb-6">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {testimonial.author[0]}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to transform your hiring?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join hundreds of companies using CodeAssess to hire better
              developers, faster.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/dashboard">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
                <Code2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold">CodeAssess</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="#" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link to="#" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link to="#" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; 2026 CodeAssess. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
