'use server';

import { supabase, ensureAnonymousSession } from './supabase'
import { logger } from './logger'

/**
 * Безопасно устанавливает анонимную сессию
 */
async function safeEnsureAnonymousSession(): Promise<void> {
  try {
    await ensureAnonymousSession()
  } catch (authError: any) {
    if (authError?.code === 'anonymous_provider_disabled' || authError?.status === 422) {
      return
    }
    throw authError
  }
}

// ========== ВРАЧИ ==========

export async function getDoctors(): Promise<string[]> {
  try {
    await safeEnsureAnonymousSession()
    
    const { data, error } = await supabase
      .from('doctors')
      .select('name')
      .order('name', { ascending: true })
    
    if (error) {
      logger.error('Ошибка получения врачей:', error)
      throw error
    }
    
    return data?.map(d => d.name) || []
  } catch (error) {
    logger.error('Ошибка получения врачей:', error)
    return []
  }
}

export async function addDoctor(name: string): Promise<void> {
  try {
    await safeEnsureAnonymousSession()
    
    const { error } = await supabase
      .from('doctors')
      .insert({ name: name.trim() })
    
    if (error) {
      logger.error('Ошибка добавления врача:', error)
      throw error
    }
  } catch (error) {
    logger.error('Ошибка добавления врача:', error)
    throw error
  }
}

export async function deleteDoctor(name: string): Promise<void> {
  try {
    await safeEnsureAnonymousSession()
    
    const { error } = await supabase
      .from('doctors')
      .delete()
      .eq('name', name)
    
    if (error) {
      logger.error('Ошибка удаления врача:', error)
      throw error
    }
  } catch (error) {
    logger.error('Ошибка удаления врача:', error)
    throw error
  }
}

// ========== МЕДСЕСТРЫ ==========

export async function getNurses(): Promise<string[]> {
  try {
    await safeEnsureAnonymousSession()
    
    const { data, error } = await supabase
      .from('nurses')
      .select('name')
      .order('name', { ascending: true })
    
    if (error) {
      logger.error('Ошибка получения медсестер:', error)
      throw error
    }
    
    return data?.map(n => n.name) || []
  } catch (error) {
    logger.error('Ошибка получения медсестер:', error)
    return []
  }
}

export async function addNurse(name: string): Promise<void> {
  try {
    await safeEnsureAnonymousSession()
    
    const { error } = await supabase
      .from('nurses')
      .insert({ name: name.trim() })
    
    if (error) {
      logger.error('Ошибка добавления медсестры:', error)
      throw error
    }
  } catch (error) {
    logger.error('Ошибка добавления медсестры:', error)
    throw error
  }
}

export async function deleteNurse(name: string): Promise<void> {
  try {
    await safeEnsureAnonymousSession()
    
    const { error } = await supabase
      .from('nurses')
      .delete()
      .eq('name', name)
    
    if (error) {
      logger.error('Ошибка удаления медсестры:', error)
      throw error
    }
  } catch (error) {
    logger.error('Ошибка удаления медсестры:', error)
    throw error
  }
}

// ========== БЕЛЫЕ СПИСКИ ==========

export interface WhitelistEmail {
  id: number
  email: string
  provider: 'google' | 'yandex' | 'email'
  created_at: string
}

export async function getWhitelistEmails(provider?: 'google' | 'yandex' | 'email'): Promise<WhitelistEmail[]> {
  try {
    await safeEnsureAnonymousSession()
    
    let query = supabase
      .from('whitelist_emails')
      .select('*')
      .order('email', { ascending: true })
    
    if (provider) {
      query = query.eq('provider', provider)
    }
    
    const { data, error } = await query
    
    if (error) {
      logger.error('Ошибка получения белых списков:', error)
      throw error
    }
    
    return data || []
  } catch (error) {
    logger.error('Ошибка получения белых списков:', error)
    return []
  }
}

export async function addWhitelistEmail(email: string, provider: 'google' | 'yandex' | 'email'): Promise<void> {
  try {
    await safeEnsureAnonymousSession()
    
    const { error } = await supabase
      .from('whitelist_emails')
      .insert({ 
        email: email.trim().toLowerCase(),
        provider 
      })
    
    if (error) {
      logger.error('Ошибка добавления email в белый список:', error)
      throw error
    }
  } catch (error) {
    logger.error('Ошибка добавления email в белый список:', error)
    throw error
  }
}

export async function deleteWhitelistEmail(email: string): Promise<void> {
  try {
    await safeEnsureAnonymousSession()
    
    const { error } = await supabase
      .from('whitelist_emails')
      .delete()
      .eq('email', email.toLowerCase())
    
    if (error) {
      logger.error('Ошибка удаления email из белого списка:', error)
      throw error
    }
  } catch (error) {
    logger.error('Ошибка удаления email из белого списка:', error)
    throw error
  }
}
