export class Str {
    static random(length = 10): string {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }
  
    static slug(text: string): string {
      return text.toLowerCase().trim().replace(/[\s\W-]+/g, '-');
    }
  
    static uuid(): string {
      return crypto.randomUUID(); // Node.js 14.17+ / modern browsers
    }
  }
  