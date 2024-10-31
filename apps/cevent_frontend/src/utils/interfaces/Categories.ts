export enum EventCategory {
  Music = 'Music',
  Sports = 'Sports',
  Technology = 'Technology',
  All = 'All',
}

interface CategoryOptions {
  KeyWord: string;
  Phrase: string;
  Color: string;
  KeyWordFirst: boolean;
}

export const CategoryObj: Record<EventCategory, CategoryOptions> = {
  [EventCategory.Music]: {
    KeyWord: 'MUSIC',
    Phrase: 'Music',
    Color: '#FFD700',
    KeyWordFirst: false,
  },
  [EventCategory.Sports]: {
    KeyWord: 'sports',
    Phrase: 'Sports',
    Color: '#FF4500',
    KeyWordFirst: false,
  },

  [EventCategory.Technology]: {
    KeyWord: 'technology',
    Phrase: 'Technology',
    Color: '#00BFFF',
    KeyWordFirst: false,
  },

  [EventCategory.All]: {
    KeyWord: 'EVENTS',
    Phrase: 'UPCOMING',
    Color: '#000000',
    KeyWordFirst: false,
  },
};
