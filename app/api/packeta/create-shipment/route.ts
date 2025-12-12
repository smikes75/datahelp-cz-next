import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Environment variables
const PACKETA_API_KEY = process.env.PACKETA_API_KEY;
const PACKETA_API_PASSWORD = process.env.PACKETA_API_PASSWORD;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

// DataHelp address - recipient of all shipments
const DATAHELP_ADDRESS = {
  name: 'DataHelp',
  surname: 's.r.o.',
  company: 'DataHelp s.r.o.',
  street: 'Jirsíkova 541/1',
  city: 'Praha',
  zip: '18600',
  phone: '+420775220440',
  email: 'info@datahelp.cz'
};

interface PacketaShipmentRequest {
  customerName: string;
  customerSurname: string;
  customerEmail: string;
  customerPhone: string;
  customerStreet: string;
  customerCity: string;
  customerZip: string;
  deviceType: string;
  problemDescription?: string;
}

// Create Packeta shipment via XML API
async function createPacketaShipment(sender: {
  name: string;
  surname: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
}): Promise<{ packetId: string; barcode: string; password: string }> {

  // Packeta uses XML API for packet creation
  const xmlRequest = `<?xml version="1.0" encoding="utf-8"?>
<createPacket>
  <apiPassword>${PACKETA_API_PASSWORD}</apiPassword>
  <packetAttributes>
    <number>DH${Date.now()}</number>
    <name>${escapeXml(sender.name)}</name>
    <surname>${escapeXml(sender.surname)}</surname>
    <email>${escapeXml(sender.email)}</email>
    <phone>${escapeXml(sender.phone)}</phone>
    <addressId>99</addressId>
    <value>2000</value>
    <weight>0.75</weight>
    <eshop>datahelp.cz</eshop>
    <senderName>${escapeXml(DATAHELP_ADDRESS.name)}</senderName>
    <senderSurname>${escapeXml(DATAHELP_ADDRESS.surname)}</senderSurname>
    <senderCompany>${escapeXml(DATAHELP_ADDRESS.company)}</senderCompany>
    <senderStreet>${escapeXml(DATAHELP_ADDRESS.street)}</senderStreet>
    <senderCity>${escapeXml(DATAHELP_ADDRESS.city)}</senderCity>
    <senderZip>${escapeXml(DATAHELP_ADDRESS.zip)}</senderZip>
    <senderPhone>${escapeXml(DATAHELP_ADDRESS.phone)}</senderPhone>
    <senderEmail>${escapeXml(DATAHELP_ADDRESS.email)}</senderEmail>
  </packetAttributes>
</createPacket>`;

  const response = await fetch('https://www.zasilkovna.cz/api/rest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/xml',
    },
    body: xmlRequest,
  });

  const xmlResponse = await response.text();

  // Parse XML response
  const packetIdMatch = xmlResponse.match(/<id>(\d+)<\/id>/);
  const barcodeMatch = xmlResponse.match(/<barcode>([^<]+)<\/barcode>/);
  const passwordMatch = xmlResponse.match(/<password>([^<]+)<\/password>/);

  if (!packetIdMatch || !barcodeMatch) {
    console.error('Packeta API error:', xmlResponse);
    throw new Error('Failed to create Packeta shipment');
  }

  return {
    packetId: packetIdMatch[1],
    barcode: barcodeMatch[1],
    password: passwordMatch ? passwordMatch[1] : generateFallbackPassword(),
  };
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateFallbackPassword(): string {
  return Math.random().toString().slice(2, 10);
}

// Email templates
function generateCustomerEmail({ name, password, barcode }: { name: string; password: string; barcode: string }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.8; color: #333; font-size: 18px; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1B387A; color: white; padding: 25px; text-align: center; }
    .header h1 { font-size: 28px; margin: 0 0 5px 0; }
    .header p { font-size: 16px; margin: 0; }
    .content { padding: 25px; background: #f9f9f9; font-size: 18px; }
    .content h2 { font-size: 24px; color: #1B387A; }
    .password-box { background: white; border: 3px solid #1B387A; border-radius: 12px; padding: 25px; text-align: center; margin: 25px 0; }
    .password-label { margin: 0 0 10px 0; color: #666; font-size: 18px; }
    .password { font-size: 42px; font-family: monospace; font-weight: bold; color: #1B387A; letter-spacing: 6px; }
    .steps { background: white; padding: 25px; border-radius: 12px; margin: 25px 0; }
    .steps h3 { font-size: 22px; color: #1B387A; margin-top: 0; }
    .steps ol { padding-left: 25px; font-size: 18px; }
    .steps li { margin-bottom: 15px; line-height: 1.6; }
    .warning { background: #E8F4FD; border: 2px solid #1B387A; border-radius: 12px; padding: 20px; margin: 25px 0; font-size: 18px; }
    .warning strong { color: #1B387A; }
    .warning ul { margin: 15px 0 0 0; padding-left: 25px; }
    .warning li { margin-bottom: 10px; }
    .footer { text-align: center; padding: 25px; color: #666; font-size: 16px; }
    .btn { display: inline-block; background: #1B387A; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>DataHelp</h1>
      <p>Profesionální záchrana dat</p>
    </div>

    <div class="content">
      <h2>Dobrý den, ${name},</h2>

      <p>děkujeme za váš zájem o služby DataHelp. Připravili jsme pro vás zásilku pro bezplatné odeslání vašeho zařízení k diagnostice.</p>

      <div class="password-box">
        <p class="password-label">Vaše podací heslo:</p>
        <div class="password">${password}</div>
      </div>

      <div class="steps">
        <h3>Jak postupovat:</h3>
        <ol>
          <li><strong>Zabalte zařízení</strong> do antistatického obalu a pevné krabice s výplní</li>
          <li><strong>Navštivte nejbližší podací místo Zásilkovny</strong> (ne Z-BOX!)</li>
          <li><strong>Nahlaste obsluze podací heslo</strong> uvedené výše</li>
          <li>Obsluha vytiskne štítek a převezme zásilku</li>
        </ol>

        <p style="text-align: center; margin-top: 25px;">
          <a href="https://www.zasilkovna.cz/pobocky" class="btn">Najít nejbližší podací místo →</a>
        </p>
      </div>

      <div class="warning">
        <strong>⚠️ Důležité:</strong>
        <ul>
          <li>Podací heslo platí <strong>14 dní</strong></li>
          <li>Zásilku lze podat <strong>POUZE na podacím místě s obsluhou</strong> (ne do Z-BOXu)</li>
          <li>Číslo zásilky pro sledování: <strong>${barcode}</strong></li>
        </ul>
      </div>

      <p>Po přijetí vašeho zařízení vás budeme kontaktovat s výsledky bezplatné diagnostiky a cenovou nabídkou na záchranu dat.</p>

      <p>Přeprava je <strong>zdarma</strong> – náklady hradí DataHelp.</p>

      <p>S pozdravem,<br>
      <strong>Tým DataHelp</strong></p>
    </div>

    <div class="footer">
      <p>
        DataHelp s.r.o. | Jirsíkova 541/1, Praha 8<br>
        Tel: +420 775 220 440 | info@datahelp.cz<br>
        <a href="https://www.datahelp.cz">www.datahelp.cz</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

function generateAdminEmail({
  customer,
  deviceType,
  problemDescription,
  packetId,
  barcode
}: {
  customer: { name: string; surname: string; email: string; phone: string; street: string; city: string; zip: string };
  deviceType: string;
  problemDescription?: string;
  packetId: string;
  barcode: string;
}) {
  const deviceTypes: Record<string, string> = {
    hdd: 'Pevný disk (HDD)',
    ssd: 'SSD disk',
    raid: 'RAID / NAS',
    flash: 'Flash disk / SD karta',
    other: 'Jiné'
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1B387A; color: white; padding: 15px 20px; }
    .content { padding: 20px; }
    .section { background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 15px; }
    .section h3 { margin: 0 0 10px 0; color: #1B387A; }
    .label { font-weight: bold; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">📦 Nová Packeta zásilka</h2>
    </div>

    <div class="content">
      <div class="section">
        <h3>Zákazník</h3>
        <p><span class="label">Jméno:</span> ${customer.name} ${customer.surname}</p>
        <p><span class="label">Email:</span> <a href="mailto:${customer.email}">${customer.email}</a></p>
        <p><span class="label">Telefon:</span> <a href="tel:${customer.phone}">${customer.phone}</a></p>
        <p><span class="label">Adresa:</span> ${customer.street}, ${customer.zip} ${customer.city}</p>
      </div>

      <div class="section">
        <h3>Zařízení</h3>
        <p><span class="label">Typ:</span> ${deviceTypes[deviceType] || deviceType}</p>
        <p><span class="label">Popis problému:</span> ${problemDescription || 'Neuvedeno'}</p>
      </div>

      <div class="section">
        <h3>Packeta</h3>
        <p><span class="label">Packet ID:</span> ${packetId}</p>
        <p><span class="label">Čárový kód:</span> ${barcode}</p>
        <p><a href="https://tracking.packeta.com/cs/?id=${barcode}">Sledovat zásilku →</a></p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body: PacketaShipmentRequest = await request.json();

    // Validate required fields
    const requiredFields = ['customerName', 'customerSurname', 'customerEmail', 'customerPhone', 'customerStreet', 'customerCity', 'customerZip', 'deviceType'];
    for (const field of requiredFields) {
      if (!body[field as keyof PacketaShipmentRequest]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Initialize Supabase client with service role key
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    let packetaResponse: { packetId: string; barcode: string; password: string };

    // TODO: Enable real Packeta API when account is approved
    // For now, use mock mode until Packeta account is activated
    const USE_MOCK_MODE = true; // Set to false when Packeta account is approved

    if (!USE_MOCK_MODE && PACKETA_API_PASSWORD) {
      // Create shipment in Packeta
      packetaResponse = await createPacketaShipment({
        name: body.customerName,
        surname: body.customerSurname,
        email: body.customerEmail,
        phone: body.customerPhone,
        street: body.customerStreet,
        city: body.customerCity,
        zip: body.customerZip.replace(/\s/g, ''),
      });
    } else {
      // Mock mode - generate test data
      console.log('Using mock mode for Packeta shipment');
      packetaResponse = {
        packetId: `MOCK-${Date.now()}`,
        barcode: `Z${Date.now().toString().slice(-10)}`,
        password: generateFallbackPassword(),
      };
    }

    // Save to Supabase
    const { data: shipment, error: dbError } = await supabase
      .from('packeta_shipments')
      .insert({
        customer_name: body.customerName,
        customer_surname: body.customerSurname,
        customer_email: body.customerEmail,
        customer_phone: body.customerPhone,
        customer_street: body.customerStreet,
        customer_city: body.customerCity,
        customer_zip: body.customerZip.replace(/\s/g, ''),
        device_type: body.deviceType,
        problem_description: body.problemDescription || null,
        packet_id: packetaResponse.packetId,
        barcode: packetaResponse.barcode,
        submission_password: packetaResponse.password,
        status: 'created',
      })
      .select()
      .single();

    if (dbError) {
      console.error('Supabase error:', dbError);
      throw new Error('Failed to save shipment to database');
    }

    // Send emails if Resend is configured
    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);

      // Email to customer
      try {
        await resend.emails.send({
          from: 'DataHelp <info@datahelp.cz>',
          to: body.customerEmail,
          subject: 'Instrukce k odeslání vašeho zařízení – DataHelp',
          html: generateCustomerEmail({
            name: body.customerName,
            password: packetaResponse.password,
            barcode: packetaResponse.barcode,
          }),
        });

        // Email to DataHelp admin
        await resend.emails.send({
          from: 'Web DataHelp <info@datahelp.cz>',
          to: 'info@datahelp.cz',
          subject: `📦 Nová Packeta zásilka: ${body.customerName} ${body.customerSurname}`,
          html: generateAdminEmail({
            customer: {
              name: body.customerName,
              surname: body.customerSurname,
              email: body.customerEmail,
              phone: body.customerPhone,
              street: body.customerStreet,
              city: body.customerCity,
              zip: body.customerZip,
            },
            deviceType: body.deviceType,
            problemDescription: body.problemDescription,
            packetId: packetaResponse.packetId,
            barcode: packetaResponse.barcode,
          }),
        });

        // Update email_sent_at
        await supabase
          .from('packeta_shipments')
          .update({ email_sent_at: new Date().toISOString() })
          .eq('id', shipment.id);

      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the whole request if email fails
      }
    } else {
      console.warn('Resend API not configured, skipping emails');
    }

    return NextResponse.json({
      success: true,
      shipmentId: shipment.id,
      password: packetaResponse.password,
      barcode: packetaResponse.barcode,
    });

  } catch (error) {
    console.error('Error creating Packeta shipment:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
