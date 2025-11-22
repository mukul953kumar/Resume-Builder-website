import React from 'react';
import { 
  Shield, 
  Users, 
  MapPin, 
  Camera, 
  BarChart3, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Star,
  Globe,
  Smartphone,
  Zap,
  Award,
  TrendingUp,
  Eye,
  MessageSquare
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Camera,
      title: "Photo Documentation",
      description: "Upload images to provide visual evidence of civic issues",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: MapPin,
      title: "GPS Location Tracking",
      description: "Automatic location detection for precise issue reporting",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Clock,
      title: "Real-time Status Updates",
      description: "Track your complaint status from submission to resolution",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive insights and performance metrics for admins",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Available in Hindi and English for better accessibility",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Government-grade security with role-based access control",
      color: "from-teal-500 to-green-500"
    }
  ];

  const stats = [
    { number: "10K+", label: "Issues Resolved", icon: CheckCircle },
    { number: "50+", label: "Cities Connected", icon: MapPin },
    { number: "24/7", label: "Support Available", icon: Clock },
    { number: "98%", label: "Satisfaction Rate", icon: Star }
  ];

  const adminTypes = [
    {
      title: "Category Admin",
      description: "Specialized officers handling specific issue types",
      features: ["Category-specific complaints", "Status updates", "Resolution photos"],
      color: "bg-gradient-to-br from-purple-600 to-pink-600"
    },
    {
      title: "Block Admin",
      description: "Managing all issues within assigned blocks",
      features: ["Block-wide oversight", "Category assignment", "Progress tracking"],
      color: "bg-gradient-to-br from-blue-600 to-cyan-600"
    },
    {
      title: "District Admin",
      description: "District-level management and coordination",
      features: ["District overview", "Heatmap analytics", "Block management"],
      color: "bg-gradient-to-br from-green-600 to-emerald-600"
    },
    {
      title: "Super Admin",
      description: "System-wide control and administration",
      features: ["Full system access", "User management", "System settings"],
      color: "bg-gradient-to-br from-orange-600 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          {/* Navigation */}
          <nav className="flex items-center justify-between mb-16">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">CivicConnect</span>
            </div>
            <button
              onClick={onGetStarted}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started
            </button>
          </nav>

          {/* Hero Content */}
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 mb-8">
              <Zap className="h-4 w-4 text-purple-400 mr-2" />
              <span className="text-purple-300 text-sm font-medium">Next-Gen Civic Reporting Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Your
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> City</span>
              <br />
              One Report at a Time
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Empower citizens to report civic issues instantly while enabling government officials 
              to manage and resolve them efficiently through our intelligent platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
              >
                Start Reporting Issues
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-purple-400 text-purple-300 font-semibold rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300 flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
              <stat.icon className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-b from-transparent to-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-500/30 mb-6">
              <TrendingUp className="h-4 w-4 text-blue-400 mr-2" />
              <span className="text-blue-300 text-sm font-medium">Powerful Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need for
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Smart Governance</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our comprehensive platform combines cutting-edge technology with user-friendly design 
              to create the ultimate civic engagement experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl" 
                     style={{ background: `linear-gradient(135deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})` }}></div>
                <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`h-12 w-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Types Section */}
      <div className="py-24 bg-gradient-to-b from-slate-800/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 mb-6">
              <Users className="h-4 w-4 text-green-400 mr-2" />
              <span className="text-green-300 text-sm font-medium">Multi-Level Administration</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Hierarchical
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"> Management System</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our sophisticated admin structure ensures efficient complaint routing and resolution 
              at every level of government administration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminTypes.map((admin, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl"
                     style={{ background: admin.color.replace('bg-gradient-to-br', 'linear-gradient(135deg,') }}></div>
                <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:-translate-y-2 h-full">
                  <div className={`h-16 w-16 ${admin.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3 text-center">{admin.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 text-center">{admin.description}</p>
                  <ul className="space-y-2">
                    {admin.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24 bg-gradient-to-b from-transparent to-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full border border-orange-500/30 mb-6">
              <Smartphone className="h-4 w-4 text-orange-400 mr-2" />
              <span className="text-orange-300 text-sm font-medium">Simple Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How It
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"> Works</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="h-20 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 h-8 w-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Report Issue</h3>
              <p className="text-gray-300">Citizens can easily report civic issues with photos, location, and detailed descriptions through our intuitive interface.</p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="h-20 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 h-8 w-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Auto Assignment</h3>
              <p className="text-gray-300">Our smart system automatically routes complaints to the appropriate admin based on category, location, and priority level.</p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="h-20 w-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 h-8 w-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Track & Resolve</h3>
              <p className="text-gray-300">Real-time status updates keep citizens informed while admins efficiently manage and resolve issues with photo documentation.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Community?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of citizens and government officials who are already making their communities better, one report at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border-2 border-purple-400 text-purple-300 font-semibold rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CivicConnect</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 CivicConnect. Empowering communities through technology.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;