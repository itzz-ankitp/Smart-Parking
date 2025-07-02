import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';
import { 
  Bot, 
  Map, 
  BarChart3, 
  ArrowRight, 
  Clock,
  MapPin,
  User,
  TrendingUp
} from 'lucide-react';

export const DashboardPage = () => {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    const name = user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'User';
    
    if (hour < 12) {
      return `Good morning, ${name}!`;
    } else if (hour < 17) {
      return `Good afternoon, ${name}!`;
    } else {
      return `Good evening, ${name}!`;
    }
  };

  const recentActivities = [
    {
      id: 1,
      action: 'Started a conversation with AI Assistant',
      time: '2 hours ago',
      icon: Bot,
      color: 'text-[var(--smart-accent)]'
    },
    {
      id: 2,
      action: 'Viewed service locations in Whitefield area',
      time: '1 day ago',
      icon: MapPin,
      color: 'text-[var(--smart-secondary)]'
    },
    {
      id: 3,
      action: 'Account created successfully',
      time: '3 days ago',
      icon: User,
      color: 'text-[var(--smart-primary)]'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 page-transition">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <Card className="smart-shadow mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[var(--smart-primary)]">
                  {getGreeting()}
                </h1>
                <p className="text-gray-600 mt-1">
                  Welcome back to your Smart Services Portal
                </p>
              </div>
              <div className="hidden sm:block">
                <div className="bg-[var(--smart-background)] rounded-lg p-4">
                  <TrendingUp className="h-8 w-8 text-[var(--smart-accent)]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* AI Assistant Card */}
          <Link href="/chatbot">
            <Card className="smart-shadow hover:shadow-lg smart-transition cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-[var(--smart-accent)] rounded-lg flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">AI Assistant</h3>
                    <p className="text-sm text-gray-500">Get instant help and answers</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-[var(--smart-accent)] font-medium group-hover:text-[var(--smart-accent)]/80 smart-transition">
                    <span>Start conversation</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Service Map Card */}
          <Link href="/map">
            <Card className="smart-shadow hover:shadow-lg smart-transition cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-[var(--smart-secondary)] rounded-lg flex items-center justify-center">
                      <Map className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Service Map</h3>
                    <p className="text-sm text-gray-500">Explore service locations</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-[var(--smart-secondary)] font-medium group-hover:text-[var(--smart-secondary)]/80 smart-transition">
                    <span>View map</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Quick Stats Card */}
          <Card className="smart-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-[var(--smart-primary)] rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Quick Stats</h3>
                  <p className="text-sm text-gray-500">Your activity overview</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--smart-primary)]">12</div>
                  <div className="text-xs text-gray-500">Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--smart-accent)]">3</div>
                  <div className="text-xs text-gray-500">Services</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="smart-shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          </div>
          <CardContent className="p-6">
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivities.map((activity, index) => (
                  <li key={activity.id}>
                    <div className={`relative ${index !== recentActivities.length - 1 ? 'pb-8' : ''}`}>
                      {index !== recentActivities.length - 1 && (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                            activity.icon === Bot ? 'bg-[var(--smart-accent)]' :
                            activity.icon === MapPin ? 'bg-[var(--smart-secondary)]' :
                            'bg-[var(--smart-primary)]'
                          }`}>
                            <activity.icon className="h-4 w-4 text-white" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              {activity.action}
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <time className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {activity.time}
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
