export function waitTimeout(delay: number = 1): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
