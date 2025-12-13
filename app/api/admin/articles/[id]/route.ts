import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create admin client with service role key (bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Verify admin auth (simple check - in production use proper auth)
    const authHeader = request.headers.get('x-admin-auth');
    if (authHeader !== 'dhadmin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // First delete category associations
    await supabaseAdmin
      .from('blog_post_categories')
      .delete()
      .eq('post_id', id);

    // Then delete the post
    const { error } = await supabaseAdmin
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
