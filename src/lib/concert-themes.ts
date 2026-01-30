export interface ThemeConfig {
    colors: {
        background: string;
        text: string;
        accent: string;
        button: string;
        overlay: string;
    };
    fonts: {
        heading: string;
        body: string;
    };
    images: {
        placeholder: string;
    };
}

// Tipo para las claves de temas (útil para Sanity y validación)
export type ConcertThemeKey = 'rock' | 'pop' | 'urbano' | 'party' | 'classic' | 'electronic' | 'kids' | 'indie';

export const THEMES: Record<ConcertThemeKey, ThemeConfig> = {
    // 1. ROCK - Dark/Grunge
    rock: {
        colors: {
            background: 'bg-zinc-900',
            text: 'text-zinc-100',
            accent: 'text-red-600',
            button: 'bg-red-700 hover:bg-red-600 text-white',
            overlay: 'bg-black/80',
        },
        fonts: {
            heading: 'font-black tracking-tighter uppercase',
            body: 'font-sans',
        },
        images: {
            placeholder: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=1920&auto=format&fit=crop', // Rock concert crowd
        },
    },

    // 2. POP - High Pop/Teen - Glitter/Fantasía
    pop: {
        colors: {
            background: 'bg-zinc-900',
            text: 'text-zinc-100',
            accent: 'text-pink-400',
            button: 'bg-pink-500 hover:bg-pink-400 text-white',
            overlay: 'bg-fuchsia-950/80',
        },
        fonts: {
            heading: 'font-bold tracking-tight',
            body: 'font-medium',
        },
        images: {
            placeholder: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1920&auto=format&fit=crop', // Pop aesthetics
        },
    },

    // 3. URBANO - Reggaeton/Trap - Calle/Flow/Noche
    urbano: {
        colors: {
            background: 'bg-zinc-900',
            text: 'text-zinc-100',
            accent: 'text-lime-400',
            button: 'bg-lime-500 hover:bg-lime-400 text-black font-bold',
            overlay: 'bg-slate-950/85',
        },
        fonts: {
            heading: 'font-black tracking-tight uppercase italic',
            body: 'font-bold',
        },
        images: {
            placeholder: 'https://images.unsplash.com/photo-1571609803439-bc4c9a0a4e0c?q=80&w=1920&auto=format&fit=crop', // Urban/Street vibe
        },
    },

    // 4. PARTY - Cumbia/Ranchera - Cálida/Festival
    party: {
        colors: {
            background: 'bg-orange-950',
            text: 'text-zinc-100',
            accent: 'text-yellow-400',
            button: 'bg-orange-600 hover:bg-orange-500 text-white',
            overlay: 'bg-orange-950/75',
        },
        fonts: {
            heading: 'font-extrabold italic',
            body: 'font-sans',
        },
        images: {
            placeholder: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1920&auto=format&fit=crop', // Festival/Party vibe
        },
    },

    // 5. CLASSIC - Romántico/Adulto - Elegante/Serif
    classic: {
        colors: {
            background: 'bg-slate-900',
            text: 'text-zinc-100',
            accent: 'text-amber-200',
            button: 'bg-slate-700 hover:bg-slate-600 text-amber-100',
            overlay: 'bg-slate-900/80',
        },
        fonts: {
            heading: 'font-serif tracking-wide',
            body: 'font-light',
        },
        images: {
            placeholder: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1920&auto=format&fit=crop', // Classic/Elegant
        },
    },

    // 6. ELECTRONIC - Techno/House - Cyberpunk
    electronic: {
        colors: {
            background: 'bg-zinc-900',
            text: 'text-zinc-100',
            accent: 'text-cyan-400',
            button: 'bg-cyan-600 hover:bg-cyan-500 text-black font-bold',
            overlay: 'bg-black/85',
        },
        fonts: {
            heading: 'font-black tracking-widest uppercase',
            body: 'font-mono',
        },
        images: {
            placeholder: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1920&auto=format&fit=crop', // Electronic/DJ
        },
    },

    // 7. KIDS - Familiar - Suave/Segura
    kids: {
        colors: {
            background: 'bg-sky-900',
            text: 'text-zinc-100',
            accent: 'text-sky-200',
            button: 'bg-sky-500 hover:bg-sky-400 text-white',
            overlay: 'bg-sky-900/70',
        },
        fonts: {
            heading: 'font-bold tracking-normal rounded-lg',
            body: 'font-sans',
        },
        images: {
            placeholder: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1920&auto=format&fit=crop', // Family/Kids friendly
        },
    },

    // 8. INDIE - Alternativo - Hipster/Folk
    indie: {
        colors: {
            background: 'bg-emerald-950',
            text: 'text-zinc-100',
            accent: 'text-emerald-200',
            button: 'bg-emerald-700 hover:bg-emerald-600 text-white',
            overlay: 'bg-emerald-950/75',
        },
        fonts: {
            heading: 'font-semibold tracking-tight',
            body: 'font-light',
        },
        images: {
            placeholder: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1920&auto=format&fit=crop', // Indie/Alternative
        },
    },
};
