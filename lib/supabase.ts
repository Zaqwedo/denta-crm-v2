import { createClient } from '@supabase/supabase-js'

// Используем NEXT_PUBLIC_ префикс для доступа в клиентском коде
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Проверяем наличие переменных
// Если переменные не установлены, создаем заглушку (для случаев когда Supabase не нужен, например для бота)
if (!supabaseUrl || !supabaseAnonKey) {
  // Только в development режиме показываем ошибку
  if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
    // В server-side development показываем предупреждение, но не падаем
    console.warn('⚠️  Supabase not configured. Some features may not work.')
  }
}

// Создаем клиент (даже если переменные не установлены - для совместимости)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)