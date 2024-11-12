export enum EventCategory {
  Music = 'Music',
  Sports = 'Sports',
  Technology = 'Technology',
  Art = 'Art',
  Social = 'Social',
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
    Phrase: 'FLOW WITH THE ',
    Color: '#FFD700',
    KeyWordFirst: false,
  },
  [EventCategory.Sports]: {
    KeyWord: 'SSPORT',
    Phrase: 'IN YOUR LIFE',
    Color: '#FF4500',
    KeyWordFirst: true,
  },

  [EventCategory.Technology]: {
    KeyWord: 'TECHNOLOGY',
    Phrase: 'DRIVES',
    Color: '#00BFFF',
    KeyWordFirst: false,
  },
  [EventCategory.Art]: {
    KeyWord: 'ART',
    Phrase: 'THAT INSPIRES',
    Color: '#FF69B4',
    KeyWordFirst: true,
  },
  [EventCategory.Social]: {
    KeyWord: 'SOCIAL WORLD',
    Phrase: 'IN A',
    Color: '#FF8C00',
    KeyWordFirst: false,
  },

  [EventCategory.All]: {
    KeyWord: 'EVENTS',
    Phrase: 'UPCOMING',
    Color: '#000000',
    KeyWordFirst: false,
  },
};
