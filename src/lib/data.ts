// Pre-computed translation data for language length comparison
// These are real translations showing how text expands/contracts across languages

export interface TranslationEntry {
  id: string;
  category: "ui-label" | "phrase" | "sentence" | "paragraph";
  english: string;
  translations: Record<string, string>;
}

export const translationData: TranslationEntry[] = [
  // UI Labels
  {
    id: "submit",
    category: "ui-label",
    english: "Submit",
    translations: {
      es: "Enviar",
      de: "Absenden",
      ja: "送信",
      zh: "提交",
      ar: "إرسال",
    },
  },
  {
    id: "settings",
    category: "ui-label",
    english: "Settings",
    translations: {
      es: "Configuración",
      de: "Einstellungen",
      ja: "設定",
      zh: "设置",
      ar: "الإعدادات",
    },
  },
  {
    id: "search",
    category: "ui-label",
    english: "Search",
    translations: {
      es: "Buscar",
      de: "Suchen",
      ja: "検索",
      zh: "搜索",
      ar: "بحث",
    },
  },
  {
    id: "notifications",
    category: "ui-label",
    english: "Notifications",
    translations: {
      es: "Notificaciones",
      de: "Benachrichtigungen",
      ja: "通知",
      zh: "通知",
      ar: "الإشعارات",
    },
  },
  {
    id: "delete-account",
    category: "ui-label",
    english: "Delete Account",
    translations: {
      es: "Eliminar cuenta",
      de: "Konto löschen",
      ja: "アカウントを削除",
      zh: "删除账户",
      ar: "حذف الحساب",
    },
  },
  {
    id: "save-changes",
    category: "ui-label",
    english: "Save Changes",
    translations: {
      es: "Guardar cambios",
      de: "Änderungen speichern",
      ja: "変更を保存",
      zh: "保存更改",
      ar: "حفظ التغييرات",
    },
  },
  // Phrases
  {
    id: "welcome-back",
    category: "phrase",
    english: "Welcome back! You have new messages.",
    translations: {
      es: "¡Bienvenido de nuevo! Tienes mensajes nuevos.",
      de: "Willkommen zurück! Sie haben neue Nachrichten.",
      ja: "おかえりなさい！新しいメッセージがあります。",
      zh: "欢迎回来！您有新消息。",
      ar: "مرحبًا بعودتك! لديك رسائل جديدة.",
    },
  },
  {
    id: "no-results",
    category: "phrase",
    english: "No results found. Try a different search term.",
    translations: {
      es: "No se encontraron resultados. Prueba con otro término de búsqueda.",
      de: "Keine Ergebnisse gefunden. Versuchen Sie einen anderen Suchbegriff.",
      ja: "結果が見つかりませんでした。別の検索語をお試しください。",
      zh: "未找到结果。请尝试其他搜索词。",
      ar: "لم يتم العثور على نتائج. جرّب مصطلح بحث مختلف.",
    },
  },
  // Sentences
  {
    id: "cookie-notice",
    category: "sentence",
    english:
      "This website uses cookies to ensure you get the best experience on our website.",
    translations: {
      es: "Este sitio web utiliza cookies para garantizar que obtenga la mejor experiencia en nuestro sitio web.",
      de: "Diese Website verwendet Cookies, um sicherzustellen, dass Sie die beste Erfahrung auf unserer Website machen.",
      ja: "このウェブサイトでは、最高の体験を提供するためにCookieを使用しています。",
      zh: "本网站使用Cookie以确保您在我们的网站上获得最佳体验。",
      ar: "يستخدم هذا الموقع ملفات تعريف الارتباط لضمان حصولك على أفضل تجربة على موقعنا.",
    },
  },
  {
    id: "password-req",
    category: "sentence",
    english:
      "Your password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.",
    translations: {
      es: "Su contraseña debe tener al menos 8 caracteres e incluir al menos una letra mayúscula, un número y un carácter especial.",
      de: "Ihr Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, eine Zahl und ein Sonderzeichen enthalten.",
      ja: "パスワードは8文字以上で、大文字、数字、特殊文字をそれぞれ1つ以上含む必要があります。",
      zh: "您的密码必须至少包含8个字符，且至少包含一个大写字母、一个数字和一个特殊字符。",
      ar: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل وأن تحتوي على حرف كبير واحد على الأقل ورقم واحد وحرف خاص واحد.",
    },
  },
];

export const languages: Record<string, string> = {
  en: "English",
  es: "Spanish",
  de: "German",
  ja: "Japanese",
  zh: "Chinese",
  ar: "Arabic",
};

export function getCharCount(text: string): number {
  return text.length;
}

export function getByteCount(text: string): number {
  return new TextEncoder().encode(text).length;
}

export function getWordCount(text: string): number {
  // For CJK, count characters; for others count words
  const cjkChars = text.match(/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]/g);
  const nonCjk = text.replace(/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]/g, " ").trim();
  const wordCount = nonCjk ? nonCjk.split(/\s+/).filter(Boolean).length : 0;
  return wordCount + (cjkChars?.length || 0);
}

export function getExpansionRatio(original: string, translated: string): number {
  return translated.length / original.length;
}

export function getAverageExpansion(locale: string): number {
  const ratios = translationData.map((entry) => {
    const translated = entry.translations[locale];
    if (!translated) return 1;
    return getExpansionRatio(entry.english, translated);
  });
  return ratios.reduce((a, b) => a + b, 0) / ratios.length;
}
