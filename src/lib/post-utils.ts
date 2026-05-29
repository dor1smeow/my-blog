export function formatPostDate(dateInput: string | Date) {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function estimateReadingTime(content: string) {
    const plainText = content.replace(/<[^>]+>/g, ' ');
    const words = plainText.trim().split(/\s+/).filter(Boolean).length;

    return Math.max(1, Math.ceil(words / 200));
}
