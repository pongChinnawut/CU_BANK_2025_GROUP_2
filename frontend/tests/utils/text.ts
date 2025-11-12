export function getText(template: string, params: Record<string, any> = {}): string {
  if (!template) return "";

  return template.replace(/{{(.*?)}}/g, (_, key) => {
    const cleanKey = key.trim();
    const value = params[cleanKey];
    return value !== undefined ? String(value) : `{{${cleanKey}}}`;
  });
}
