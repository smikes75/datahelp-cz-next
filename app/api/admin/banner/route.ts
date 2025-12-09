import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const CONFIG_PATH = path.join(process.cwd(), 'config', 'banner.config.json');

interface BannerConfig {
  enabled: boolean;
  text: string;
  link: string;
  backgroundColor: string;
  textColor: string;
}

// GET - Get current banner config
export async function GET() {
  try {
    const data = await fs.readFile(CONFIG_PATH, 'utf-8');
    const config = JSON.parse(data) as BannerConfig;
    return NextResponse.json(config);
  } catch (error) {
    // Return default config if file doesn't exist
    return NextResponse.json({
      enabled: false,
      text: '',
      link: '',
      backgroundColor: '#dc2626',
      textColor: '#ffffff',
    });
  }
}

// POST - Update banner config
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const config: BannerConfig = {
      enabled: Boolean(body.enabled),
      text: String(body.text || ''),
      link: String(body.link || ''),
      backgroundColor: String(body.backgroundColor || '#dc2626'),
      textColor: String(body.textColor || '#ffffff'),
    };

    // Ensure config directory exists
    await fs.mkdir(path.dirname(CONFIG_PATH), { recursive: true });

    await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2));

    return NextResponse.json({ success: true, config });
  } catch (error) {
    console.error('Error saving banner config:', error);
    return NextResponse.json(
      { error: 'Failed to save config' },
      { status: 500 }
    );
  }
}
