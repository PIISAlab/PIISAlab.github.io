import { getCollection, type CollectionEntry } from 'astro:content';

type Name = 'people' | 'publications' | 'news' | 'research';

/** Collection entries' data in the order they appear in src/data/<name>.yaml. */
export async function list<N extends Name>(name: N): Promise<CollectionEntry<N>['data'][]> {
	const entries = (await getCollection(name)) as CollectionEntry<N>[];
	return entries.map((e) => e.data).sort((a, b) => a.order - b.order);
}
