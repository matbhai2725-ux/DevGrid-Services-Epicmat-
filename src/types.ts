export type ServiceId = 
  | 'discord-bots'
  | 'websites-apps'
  | 'bot-hosting'
  | 'minecraft-services'
  | 'custom-development'
  | 'setup-configuration';

export interface ServiceItem {
  id: ServiceId;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  accentHex: number;
  features: string[];
  startingPrice: string;
  typicalDelivery: string;
  popularAddons: string[];
  specs: { label: string; value: string }[];
}

export interface ConfiguratorOption {
  serviceId: ServiceId;
  tier: 'starter' | 'pro' | 'enterprise';
  hostingDurationMonths: number;
  addons: string[];
  customNotes: string;
}

export interface SystemMetric {
  label: string;
  value: string;
  change: string;
  status: 'optimal' | 'stable' | 'active';
}
