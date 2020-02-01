export function urlFromRoot(rootPath?: string, ...path: string[]): string {

    const route = [rootPath, ...path].filter(p => p).map(r => `/${r}`).join('');

    return route;
}
