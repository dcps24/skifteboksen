// ============================================
// Skifteboksen – app.js (security-hardened)
// ============================================

// ============================================
// Security Utilities
// ============================================

function sanitizeHTML(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
}

function isValidCheckedItems(data) {
    if (typeof data !== 'object' || data === null || Array.isArray(data)) return false;
    if (Object.keys(data).length > 200) return false;
    return Object.entries(data).every(([k, v]) =>
        typeof k === 'string' && k.length <= 100 && typeof v === 'boolean'
    );
}

function isValidCustomItems(data) {
    if (typeof data !== 'object' || data === null || Array.isArray(data)) return false;
    if (Object.keys(data).length > 50) return false;
    return Object.entries(data).every(([k, v]) =>
        typeof k === 'string' && k.length <= 100 &&
        typeof v === 'object' && v !== null && !Array.isArray(v) &&
        typeof v.name === 'string' && v.name.length <= 50
    );
}

// ============================================
// Data Structure: Seasonal Checklists
// ============================================

const checklistData = {
    vinter: {
        barnehage: {
            '0-1': [
                { id: 'sokker', name: 'Varme sokker', note: 'Minst 2 par' },
                { id: 'undertrøye', name: 'Undertrøye', note: 'Merino eller ullblanding' },
                { id: 'vinterjakke', name: 'Vinterjakke', note: 'Isolert og vind- og vanntett' },
                { id: 'ullbukse', name: 'Ull- eller fleecebukse', variants: ['Tykk', 'Tynn'] },
                { id: 'lue', name: 'Vinter-lue', variants: ['Med nakkebeskytter', 'Vanlig'] },
                { id: 'votter', name: 'Votter', variants: ['Tykke', 'Mellom'], note: 'Ekstra par hvis våt' },
                { id: 'overtrekksko', name: 'Overtrekksko (Cherrox)', note: 'Over vanlige sko' },
                { id: 'halstørkle', name: 'Halstørkle eller snøffront', note: 'Holder halsen varm' },
                { id: 'pannebånd', name: 'Pannebånd', note: 'Hvis luen er for stor' },
                { id: 'tights', name: 'Ullnetting under bukse', note: 'Ekstra varmlag' }
            ],
            '1-3': [
                { id: 'sokker', name: 'Varme sokker', note: 'Minst 2–3 par' },
                { id: 'undertrøye', name: 'Undertrøye', note: 'Merino eller ullblanding' },
                { id: 'vinterjakke', name: 'Vinterjakke', note: 'Isolert og vind- og vanntett' },
                { id: 'ullbukse', name: 'Ull- eller fleecebukse', variants: ['Tykk', 'Tynn'] },
                { id: 'lue', name: 'Vinter-lue med nakkebeskytter', variants: ['Tykk', 'Tynn'] },
                { id: 'votter', name: 'Votter', variants: ['Tykke', 'Mellom'], note: 'Lett å miste – ta ekstra' },
                { id: 'overtrekksko', name: 'Overtrekksko eller gummistøvler', note: 'Viktig for varme' },
                { id: 'halstørkle', name: 'Halstørkle eller snøffront', note: 'Beskytter mot vind' },
                { id: 'pannebånd', name: 'Pannebånd', note: 'Hvis luen glir' },
                { id: 'ulltights', name: 'Ullnetting eller ullbataljong', note: 'Under bukse' }
            ],
            '3-6': [
                { id: 'sokker', name: 'Varme sokker', note: '2–3 par' },
                { id: 'undertrøye', name: 'Undertrøye', note: 'Merino eller ullblanding' },
                { id: 'vinterjakke', name: 'Vinterjakke', note: 'Isolert' },
                { id: 'ullbukse', name: 'Ull- eller fleecebukse', variants: ['Tykk', 'Tynn'] },
                { id: 'lue', name: 'Vinter-lue', variants: ['Med nakkebeskytter', 'Vanlig'] },
                { id: 'votter', name: 'Votter', variants: ['Tykke', 'Mellom'] },
                { id: 'overtrekksko', name: 'Overtrekksko eller gummistøvler' },
                { id: 'halstørkle', name: 'Halstørkle eller snøffront' },
                { id: 'hette', name: 'Hette eller pannebånd' },
                { id: 'ulltights', name: 'Ulltights under bukse' }
            ],
            '6-10': [
                { id: 'sokker', name: 'Varme sokker', note: '2–3 par' },
                { id: 'undertrøye', name: 'Undertrøye', note: 'Merino eller ullblanding' },
                { id: 'vinterjakke', name: 'Vinterjakke' },
                { id: 'ullbukse', name: 'Ull- eller fleecebukse' },
                { id: 'lue', name: 'Vinter-lue' },
                { id: 'votter', name: 'Votter' },
                { id: 'overtrekksko', name: 'Overtrekksko eller gummistøvler' },
                { id: 'halstørkle', name: 'Halstørkle eller snøffront' },
                { id: 'ulltights', name: 'Ulltights eller lange underbukser' }
            ]
        },
        sfo: {
            '0-1': [
                { id: 'sokker', name: 'Varme sokker', note: 'Minst 1 ekstra par' },
                { id: 'vinterjakke', name: 'Vinterjakke' },
                { id: 'lue', name: 'Vinter-lue' },
                { id: 'votter', name: 'Votter', note: 'Ekstra par' },
                { id: 'overtrekksko', name: 'Overtrekksko eller gummistøvler' },
                { id: 'halstørkle', name: 'Halstørkle eller snøffront' }
            ],
            '1-3': [
                { id: 'sokker', name: 'Varme sokker', note: '2 ekstra par' },
                { id: 'vinterjakke', name: 'Vinterjakke' },
                { id: 'lue', name: 'Vinter-lue' },
                { id: 'votter', name: 'Votter', note: 'Ekstra – lett å miste' },
                { id: 'overtrekksko', name: 'Overtrekksko eller gummistøvler' },
                { id: 'halstørkle', name: 'Halstørkle eller snøffront' }
            ],
            '3-6': [
                { id: 'sokker', name: 'Varme sokker', note: '1–2 ekstra' },
                { id: 'vinterjakke', name: 'Vinterjakke' },
                { id: 'lue', name: 'Vinter-lue' },
                { id: 'votter', name: 'Votter', note: 'Ekstra par' },
                { id: 'overtrekksko', name: 'Overtrekksko eller gummistøvler' },
                { id: 'halstørkle', name: 'Halstørkle' }
            ],
            '6-10': [
                { id: 'sokker', name: 'Varme sokker' },
                { id: 'vinterjakke', name: 'Vinterjakke' },
                { id: 'lue', name: 'Vinter-lue' },
                { id: 'votter', name: 'Votter' },
                { id: 'overtrekksko', name: 'Overtrekksko eller gummistøvler' },
                { id: 'halstørkle', name: 'Halstørkle' }
            ]
        },
        barneskole: {
            '3-6': [
                { id: 'sokker', name: 'Varme sokker' },
                { id: 'undertrøye', name: 'Undertrøye' },
                { id: 'vinterjakke', name: 'Vinterjakke' },
                { id: 'ullbukse', name: 'Ull- eller fleecebukse' },
                { id: 'lue', name: 'Vinter-lue' },
                { id: 'votter', name: 'Votter' },
                { id: 'gummistøvler', name: 'Gummistøvler eller skostøvler' },
                { id: 'halstørkle', name: 'Halstørkle' }
            ],
            '6-10': [
                { id: 'sokker', name: 'Varme sokker' },
                { id: 'undertrøye', name: 'Undertrøye' },
                { id: 'vinterjakke', name: 'Vinterjakke' },
                { id: 'ullbukse', name: 'Ull- eller fleecebukse' },
                { id: 'lue', name: 'Vinter-lue' },
                { id: 'votter', name: 'Votter' },
                { id: 'gummistøvler', name: 'Gummistøvler' },
                { id: 'halstørkle', name: 'Halstørkle' },
                { id: 'ryggsekkdeksel', name: 'Regndeksel til ryggsegg' }
            ]
        }
    },
    var: {
        barnehage: {
            '0-1': [
                { id: 'sokker', name: 'Mellomvarme sokker', note: '1–2 par' },
                { id: 'langarmtskjorte', name: 'Langarmskjorte', note: 'Lettvekt' },
                { id: 'vårjakke', name: 'Vårjakke', note: 'Kulemotstand' },
                { id: 'bukse', name: 'Tights eller tynne lange bukser' },
                { id: 'lue', name: 'Lett lue eller pannebånd', note: 'Beskytter mot vind' },
                { id: 'handsker', name: 'Lette handsker', note: 'Vind kan være kald' },
                { id: 'gummistøvler', name: 'Gummistøvler', note: 'For søl og fuktig bakke' },
                { id: 'solbriller', name: 'Solbriller', note: 'Beskytter mot sol' }
            ],
            '1-3': [
                { id: 'sokker', name: 'Mellomvarme sokker' },
                { id: 'langarmtskjorte', name: 'Langarmskjorte' },
                { id: 'vårjakke', name: 'Vårjakke' },
                { id: 'bukse', name: 'Lange bukser eller tights' },
                { id: 'lue', name: 'Lue eller pannebånd' },
                { id: 'handsker', name: 'Lette handsker' },
                { id: 'gummistøvler', name: 'Gummistøvler' },
                { id: 'solbriller', name: 'Solbriller' }
            ],
            '3-6': [
                { id: 'sokker', name: 'Mellomvarme sokker' },
                { id: 'langarmtskjorte', name: 'Langarmskjorte' },
                { id: 'vårjakke', name: 'Vårjakke' },
                { id: 'bukse', name: 'Lange bukser' },
                { id: 'lue', name: 'Lette luer' },
                { id: 'handsker', name: 'Handsker', note: 'Bare i tidlig vår' },
                { id: 'gummistøvler', name: 'Gummistøvler' },
                { id: 'solbriller', name: 'Solbriller' }
            ],
            '6-10': [
                { id: 'sokker', name: 'Mellomvarme sokker' },
                { id: 'langarmtskjorte', name: 'Langarmskjorte' },
                { id: 'vårjakke', name: 'Vårjakke' },
                { id: 'bukse', name: 'Lange bukser' },
                { id: 'gummistøvler', name: 'Gummistøvler' },
                { id: 'solbriller', name: 'Solbriller' }
            ]
        },
        sfo: {
            '0-1': [
                { id: 'langarmtskjorte', name: 'Langarmskjorte' },
                { id: 'vårjakke', name: 'Vårjakke' },
                { id: 'gummistøvler', name: 'Gummistøvler' },
                { id: 'lue', name: 'Lette luer' },
                { id: 'solbriller', name: 'Solbriller' }
            ],
            '1-3': [
                { id: 'langarmtskjorte', name: 'Langarmskjorte' },
                { id: 'vårjakke', name: 'Vårjakke' },
                { id: 'gummistøvler', name: 'Gummistøvler' },
                { id: 'lue', name: 'Lue eller pannebånd' },
                { id: 'solbriller', name: 'Solbriller' }
            ],
            '3-6': [
                { id: 'langarmtskjorte', name: 'Langarmskjorte' },
                { id: 'vårjakke', name: 'Vårjakke' },
                { id: 'gummistøvler', name: 'Gummistøvler' },
                { id: 'solbriller', name: 'Solbriller' }
            ],
            '6-10': [
                { id: 'vårjakke', name: 'Vårjakke' },
                { id: 'gummistøvler', name: 'Gummistøvler' },
                { id: 'solbriller', name: 'Solbriller' }
            ]
        },
        barneskole: {
            '3-6': [
                { id: 'langarmtskjorte', name: 'Langarmskjorte' },
                { id: 'vårjakke', name: 'Vårjakke' },
                { id: 'lange_bukser', name: 'Lange bukser' },
                { id: 'gummistøvler', name: 'Gummistøvler' },
                { id: 'solbriller', name: 'Solbriller' }
            ],
            '6-10': [
                { id: 'langarmtskjorte', name: 'Langarmskjorte' },
                { id: 'vårjakke', name: 'Vårjakke' },
                { id: 'gummistøvler', name: 'Gummistøvler' },
                { id: 'solbriller', name: 'Solbriller' }
            ]
        }
    },
    sommer: {
        barnehage: {
            '0-1': [
                { id: 'sokker', name: 'Tynne sokker', note: '1–2 par' },
                { id: 'tskjorte', name: 'T-skjorte', note: 'Lett og pustende' },
                { id: 'shorts', name: 'Shorts eller korte bukser' },
                { id: 'solkrem', name: 'Solkrem', note: 'SPF 50+' },
                { id: 'solhatt', name: 'Solhatt eller keps' },
                { id: 'solbriller', name: 'Solbriller' },
                { id: 'sandaler', name: 'Sandaler eller sommerkong' },
                { id: 'regntøy', name: 'Lette regntøy', note: 'For plutselige byger' },
                { id: 'tights_uv', name: 'UV-tights', note: 'Hvis strand' }
            ],
            '1-3': [
                { id: 'sokker', name: 'Tynne sokker' },
                { id: 'tskjorte', name: 'T-skjorte' },
                { id: 'shorts', name: 'Shorts' },
                { id: 'solkrem', name: 'Solkrem SPF 50+' },
                { id: 'solhatt', name: 'Solhatt' },
                { id: 'solbriller', name: 'Solbriller' },
                { id: 'sandaler', name: 'Sandaler' },
                { id: 'regntøy', name: 'Lette regntøy' },
                { id: 'tights_uv', name: 'UV-tights' }
            ],
            '3-6': [
                { id: 'sokker', name: 'Tynne sokker' },
                { id: 'tskjorte', name: 'T-skjorte' },
                { id: 'shorts', name: 'Shorts' },
                { id: 'solkrem', name: 'Solkrem' },
                { id: 'solhatt', name: 'Solhatt' },
                { id: 'solbriller', name: 'Solbriller' },
                { id: 'sandaler', name: 'Sandaler' },
                { id: 'regntøy', name: 'Lette regntøy' },
                { id: 'tights_uv', name: 'UV-tights' }
            ],
            '6-10': [
                { id: 'sokker', name: 'Tynne sokker' },
                { id: 'tskjorte', name: 'T-skjorte' },
                { id: 'shorts', name: 'Shorts' },
                { id: 'solkrem', name: 'Solkrem' },
                { id: 'solhatt', name: 'Solhatt' },
                { id: 'solbriller', name: 'Solbriller' },
                { id: 'sandaler', name: 'Sandaler' },
                { id: 'regntøy', name: 'Lette regntøy' }
            ]
        },
        sfo: {
            '0-1': [
                { id: 'tskjorte', name: 'T-skjorte' },
                { id: 'shorts', name: 'Shorts' },
                { id: 'solkrem', name: 'Solkrem SPF 50+' },
                { id: 'solhatt', name: 'Solhatt' },
                { id: 'solbriller', name: 'Solbriller' }
            ],
            '1-3': [
                { id: 'tskjorte', name: 'T-skjorte' },
                { id: 'shorts', name: 'Shorts' },
                { id: 'solkrem', name: 'Solkrem' },
                { id: 'solhatt', name: 'Solhatt' },
                { id: 'solbriller', name: 'Solbriller' }
            ],
            '3-6': [
                { id: 'tskjorte', name: 'T-skjorte' },
                { id: 'shorts', name: 'Shorts' },
                { id: 'solkrem', name: 'Solkrem' },
                { id: 'solhatt', name: 'Solhatt' },
                { id: 'solbriller', name: 'Solbriller' }
            ],
            '6-10': [
                { id: 'tskjorte', name: 'T-skjorte' },
                { id: 'shorts', name: 'Shorts' },
                { id: 'solkrem', name: 'Solkrem' },
                { id: 'solhatt', name: 'Solhatt' },
                { id: 'solbriller', name: 'Solbriller' }
            ]
        },
        barneskole: {
            '3-6': [
                { id: 'tskjorte', name: 'T-skjorte' },
                { id: 'shorts', name: 'Shorts' },
                { id: 'solkrem', name: 'Solkrem' },
                { id: 'solhatt', name: 'Solhatt' },
                { id: 'solbriller', name: 'Solbriller' },
                { id: 'regntøy', name: 'Regntøy' }
            ],
            '6-10': [
                { id: 'tskjorte', name: 'T-skjorte' },
                { id: 'shorts', name: 'Shorts' },
                { id: 'solkrem', name: 'Solkrem' },
                { id: 'solhatt', name: 'Solhatt' },
                { id: 'solbriller', name: 'Solbriller' },
                { id: 'regntøy', name: 'Regntøy' }
            ]
        }
    },
    host: {
        barnehage: {
            '0-1': [
                { id: 'sokker', name: 'Mellomvarme sokker' },
                { id: 'langarmtskjorte', name: 'Langarmskjorte' },
                { id: 'genser', name: 'Genser eller fleece' },
                { id: 'høstjakke', name: 'Høstjakke', note: 'Vind- og vanntett' },
                { id: 'lange_bukser', name: 'Lange bukser' },
                { id: 'lue', name: 'Lett lue' },
                { id: 'handsker', name: 'Handsker', note: 'Hvis kaldt' },
                { id: 'gummistøvler', name: 'Gummistøvler' },
                { id: 'solbriller', name: 'Solbriller', note: 'Høstsolen kan være sterk' }
            ],
            '1-3': [
                { id: 'sokker', name: 'Mellomvarme sokker' },
                { id: 'langarmtskjorte', name: 'Langarmskjorte' },
                { id: 'genser', name: 'Genser eller fleece' },
                { id: 'høstjakke', name: 'Høstjakke' },
                { id: 'lange_bukser', name: 'Lange bukser' },
                { id: 'lue', name: 'Lett lue' },
                { id: 'handsker', name: 'Handsker' },
                { id: 'gummistøvler', name: 'Gummistøvler' },
                { id: 'solbriller', name: 'Solbriller' }
            ],
            '3-6': [
                { id: 'sokker', name: 'Mellomvarme sokker' },
                { id: 'langarmtskjorte', name: 'Langarmskjorte' },
                { id: 'genser', name: 'Genser' },
                { id: 'høstjakke', name: 'Høstjakke' },
                { id: 'lange_bukser', name: 'Lange bukser' },
                { id: 'lue', name: 'Lue' },
                { id: 'gummistøvler', name: 'Gummistøvler' },
                { id: 'solbriller', name: 'Solbriller' }
            ],
            '6-10': [
                { id: 'sokker', name: 'Mellomvarme sokker' },
                { id: 'langarmtskjorte', name: 'Langarmskjorte' },
                { id: 'genser', name: 'Genser' },
                { id: 'høstjakke', name: 'Høstjakke' },
                { id: 'lange_bukser', name: 'Lange bukser' },
                { id: 'lue', name: 'Lue' },
                { id: 'gummistøvler', name: 'Gummistøvler' }
            ]
        },
        sfo: {
            '0-1': [
                { id: 'langarmtskjorte', name: 'Langarmskjorte' },
                { id: 'høstjakke', name: 'Høstjakke' },
                { id: 'lange_bukser', name: 'Lange bukser' },
                { id: 'lue', name: 'Lue' },
                { id: 'gummistøvler', name: 'Gummistøvler' }
            ],
            '1-3': [
                { id: 'langarmtskjorte', name: 'Langarmskjorte' },
                { id: 'høstjakke', name: 'Høstjakke' },
                { id: 'lange_bukser', name: 'Lange bukser' },
                { id: 'lue', name: 'Lue' },
                { id: 'gummistøvler', name: 'Gummistøvler' }
            ],
            '3-6': [
                { id: 'langarmtskjorte', name: 'Langarmskjorte' },
                { id: 'høstjakke', name: 'Høstjakke' },
                { id: 'lange_bukser', name: 'Lange bukser' },
                { id: 'gummistøvler', name: 'Gummistøvler' }
            ],
            '6-10': [
                { id: 'høstjakke', name: 'Høstjakke' },
                { id: 'lange_bukser', name: 'Lange bukser' },
                { id: 'gummistøvler', name: 'Gummistøvler' }
            ]
        },
        barneskole: {
            '3-6': [
                { id: 'langarmtskjorte', name: 'Langarmskjorte' },
                { id: 'genser', name: 'Genser' },
                { id: 'høstjakke', name: 'Høstjakke' },
                { id: 'lange_bukser', name: 'Lange bukser' },
                { id: 'gummistøvler', name: 'Gummistøvler' },
                { id: 'ryggsekkdeksel', name: 'Regndeksel til ryggsegg' }
            ],
            '6-10': [
                { id: 'langarmtskjorte', name: 'Langarmskjorte' },
                { id: 'genser', name: 'Genser' },
                { id: 'høstjakke', name: 'Høstjakke' },
                { id: 'lange_bukser', name: 'Lange bukser' },
                { id: 'gummistøvler', name: 'Gummistøvler' },
                { id: 'ryggsekkdeksel', name: 'Regndeksel til ryggsegg' }
            ]
        }
    }
};

// ============================================
// Season Auto-Detection
// ============================================

function getCurrentSeason() {
    const month = new Date().getMonth() + 1;
    if (month === 12 || month <= 2) return 'vinter';
    if (month <= 5) return 'var';
    if (month <= 8) return 'sommer';
    return 'host';
}

// ============================================
// Preferences: save/restore selectors
// ============================================

const PREFS_KEY = 'skifteboksen_prefs';
const VALID_SEASONS = ['vinter', 'var', 'sommer', 'host'];
const VALID_CONTEXTS = ['barnehage', 'sfo', 'barneskole'];
const VALID_AGES = ['0-1', '1-3', '3-6', '6-10'];

function loadPrefs() {
    try {
        const stored = localStorage.getItem(PREFS_KEY);
        if (!stored) return {};
        const parsed = JSON.parse(stored);
        if (typeof parsed !== 'object' || parsed === null) return {};
        // Whitelist-validate each preference value
        return {
            season: VALID_SEASONS.includes(parsed.season) ? parsed.season : null,
            context: VALID_CONTEXTS.includes(parsed.context) ? parsed.context : null,
            age: VALID_AGES.includes(parsed.age) ? parsed.age : null
        };
    } catch (e) {
        return {};
    }
}

function savePrefs() {
    localStorage.setItem(PREFS_KEY, JSON.stringify({
        season: currentState.season,
        context: currentState.context,
        age: currentState.age
    }));
}

// ============================================
// State Management
// ============================================

const prefs = loadPrefs();

let currentState = {
    season: prefs.season || getCurrentSeason(),
    context: prefs.context || 'barnehage',
    age: prefs.age || '1-3',
    checkedItems: {},
    customItems: {}
};

// ============================================
// Emoji & Theme Mapping
// ============================================

const seasonEmojis = {
    vinter: '❄️',
    var: '🌱',
    sommer: '☀️',
    host: '🍂'
};

const seasonThemes = {
    vinter: 'theme-winter',
    var: 'theme-spring',
    sommer: 'theme-summer',
    host: 'theme-autumn'
};

// ============================================
// localStorage Utilities
// ============================================

function getStorageKey(season, context, age) {
    return `skifteboksen_${season}_${context}_${age}`;
}

function loadState() {
    const key = getStorageKey(currentState.season, currentState.context, currentState.age);
    try {
        const stored = localStorage.getItem(key);
        if (!stored) { currentState.checkedItems = {}; return; }
        const parsed = JSON.parse(stored);
        currentState.checkedItems = isValidCheckedItems(parsed) ? parsed : {};
    } catch (e) {
        currentState.checkedItems = {};
    }
}

function saveState() {
    const key = getStorageKey(currentState.season, currentState.context, currentState.age);
    localStorage.setItem(key, JSON.stringify(currentState.checkedItems));
    localStorage.setItem(`${key}_custom`, JSON.stringify(currentState.customItems));
}

function loadCustomItems() {
    const key = `skifteboksen_${currentState.season}_${currentState.context}_${currentState.age}_custom`;
    try {
        const stored = localStorage.getItem(key);
        if (!stored) { currentState.customItems = {}; return; }
        const parsed = JSON.parse(stored);
        currentState.customItems = isValidCustomItems(parsed) ? parsed : {};
    } catch (e) {
        currentState.customItems = {};
    }
}

// ============================================
// Checklist Rendering  (sanitizeHTML on all user data)
// ============================================

function renderChecklist() {
    loadState();
    loadCustomItems();

    const { season, context, age } = currentState;

    if (!checklistData[season]?.[context]?.[age]) {
        document.getElementById('checklist').innerHTML = '<p>Ingen plagg for denne kombinasjonen.</p>';
        return;
    }

    const items = checklistData[season][context][age];
    // Base checklist data is hardcoded – no sanitization needed, but we use textContent below anyway
    const fragment = document.createDocumentFragment();

    items.forEach(item => {
        const isChecked = currentState.checkedItems[item.id] === true;

        const wrapper = document.createElement('div');
        wrapper.className = 'checklist-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `item_${item.id}`;
        checkbox.checked = isChecked;
        checkbox.dataset.itemId = item.id;
        checkbox.setAttribute('aria-label', item.name);

        const label = document.createElement('label');
        label.htmlFor = `item_${item.id}`;
        label.className = 'checklist-item-label';
        label.textContent = item.name;

        if (item.variants && item.variants.length > 0) {
            const span = document.createElement('span');
            span.className = 'item-variant';
            span.textContent = `(${item.variants.join(' / ')})`;
            label.appendChild(span);
        }

        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);

        if (item.note) {
            const note = document.createElement('div');
            note.className = 'checklist-item-note';
            note.textContent = item.note;
            wrapper.appendChild(note);
        }

        fragment.appendChild(wrapper);
    });

    const container = document.getElementById('checklist');
    container.innerHTML = '';
    container.appendChild(fragment);
}

function renderCustomItems() {
    const fragment = document.createDocumentFragment();

    Object.entries(currentState.customItems).forEach(([id, item]) => {
        const isChecked = currentState.checkedItems[`custom_${id}`] === true;

        const wrapper = document.createElement('div');
        wrapper.className = 'custom-item';

        const content = document.createElement('div');
        content.className = 'custom-item-content';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `custom_item_${id}`;
        checkbox.checked = isChecked;
        checkbox.dataset.itemId = `custom_${id}`;
        // sanitizeHTML used as setAttribute to prevent attribute injection
        checkbox.setAttribute('aria-label', item.name);

        const label = document.createElement('label');
        label.htmlFor = `custom_item_${id}`;
        label.className = 'custom-item-label';
        label.textContent = item.name; // textContent is inherently XSS-safe

        content.appendChild(checkbox);
        content.appendChild(label);

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'btn-delete-item';
        deleteBtn.dataset.itemId = id;
        deleteBtn.setAttribute('aria-label', `Slett ${item.name}`);
        deleteBtn.textContent = '🗑️';

        wrapper.appendChild(content);
        wrapper.appendChild(deleteBtn);
        fragment.appendChild(wrapper);
    });

    const container = document.getElementById('custom-items');
    container.innerHTML = '';
    container.appendChild(fragment);
}

// ============================================
// Item Management
// ============================================

function toggleItem(itemId) {
    currentState.checkedItems[itemId] = !currentState.checkedItems[itemId];
    saveState();
    updateProgress();
}

function addCustomItem(e) {
    e.preventDefault();
    const input = document.getElementById('custom-item-input');
    const rawValue = input.value.trim();

    if (!rawValue) return;
    if (rawValue.length > 50) return;
    if (Object.keys(currentState.customItems).length >= 50) return;

    const id = `custom_${Date.now()}`;
    // Store raw text – sanitization happens at render time via textContent
    currentState.customItems[id] = { name: rawValue };
    saveState();
    input.value = '';
    renderCustomItems();
    updateProgress();
}

function deleteCustomItem(id) {
    delete currentState.customItems[id];
    delete currentState.checkedItems[`custom_${id}`];
    saveState();
    renderCustomItems();
    updateProgress();
}

// ============================================
// Progress Tracking & Completion Celebration
// ============================================

function updateProgress() {
    const { season, context, age } = currentState;
    const baseItems = checklistData[season]?.[context]?.[age] || [];
    const customItemIds = Object.keys(currentState.customItems).map(id => `custom_${id}`);
    const allItemIds = [...baseItems.map(item => item.id), ...customItemIds];

    const totalCount = allItemIds.length;
    const checkedCount = allItemIds.filter(id => currentState.checkedItems[id] === true).length;

    document.getElementById('progress-count').textContent = checkedCount;
    document.getElementById('total-count').textContent = totalCount;

    const celebration = document.getElementById('celebration');
    celebration.hidden = !(totalCount > 0 && checkedCount === totalCount);
}

// ============================================
// Reset with inline confirmation
// ============================================

function resetChecklist() {
    document.getElementById('reset-confirm').hidden = false;
    document.getElementById('reset-btn').hidden = true;
}

function confirmReset() {
    currentState.checkedItems = {};
    saveState();
    renderChecklist();
    renderCustomItems();
    updateProgress();
    cancelReset();
}

function cancelReset() {
    document.getElementById('reset-confirm').hidden = true;
    document.getElementById('reset-btn').hidden = false;
}

// ============================================
// Heading Updates
// ============================================

function updateHeading() {
    const seasonLabels = { vinter: 'Vinter', var: 'Vår', sommer: 'Sommer', host: 'Høst' };
    const contextLabels = { barnehage: 'barnehage', sfo: 'SFO', barneskole: 'barneskole' };

    document.getElementById('season-emoji').textContent = seasonEmojis[currentState.season];
    document.getElementById('checklist-heading').textContent =
        `${seasonLabels[currentState.season]} ${contextLabels[currentState.context]}`;

    document.querySelector('.app-header').className = `app-header ${seasonThemes[currentState.season]}`;

    document.getElementById('season-select').value = currentState.season;
    document.getElementById('context-select').value = currentState.context;
    document.getElementById('age-select').value = currentState.age;
}

// ============================================
// Initialization – all event wiring here, no inline handlers in HTML
// ============================================

window.addEventListener('DOMContentLoaded', () => {
    // Form submit
    document.getElementById('add-item-form').addEventListener('submit', addCustomItem);

    // Reset flow
    document.getElementById('reset-btn').addEventListener('click', resetChecklist);
    document.getElementById('btn-confirm-yes').addEventListener('click', confirmReset);
    document.getElementById('btn-confirm-no').addEventListener('click', cancelReset);

    // Selector changes – whitelist-validate before applying
    document.getElementById('season-select').addEventListener('change', (e) => {
        if (!VALID_SEASONS.includes(e.target.value)) return;
        currentState.season = e.target.value;
        currentState.checkedItems = {};
        currentState.customItems = {};
        savePrefs();
        updateHeading();
        renderChecklist();
        renderCustomItems();
        updateProgress();
    });

    document.getElementById('context-select').addEventListener('change', (e) => {
        if (!VALID_CONTEXTS.includes(e.target.value)) return;
        currentState.context = e.target.value;
        currentState.checkedItems = {};
        currentState.customItems = {};
        savePrefs();
        updateHeading();
        renderChecklist();
        renderCustomItems();
        updateProgress();
    });

    document.getElementById('age-select').addEventListener('change', (e) => {
        if (!VALID_AGES.includes(e.target.value)) return;
        currentState.age = e.target.value;
        currentState.checkedItems = {};
        currentState.customItems = {};
        savePrefs();
        updateHeading();
        renderChecklist();
        renderCustomItems();
        updateProgress();
    });

    // Event delegation – checklist checkboxes
    document.getElementById('checklist').addEventListener('change', (e) => {
        if (e.target.type === 'checkbox' && e.target.dataset.itemId) {
            toggleItem(e.target.dataset.itemId);
        }
    });

    // Event delegation – custom item checkboxes and delete buttons
    document.getElementById('custom-items').addEventListener('change', (e) => {
        if (e.target.type === 'checkbox' && e.target.dataset.itemId) {
            toggleItem(e.target.dataset.itemId);
        }
    });
    document.getElementById('custom-items').addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-delete-item');
        if (btn && btn.dataset.itemId) {
            deleteCustomItem(btn.dataset.itemId);
        }
    });

    // Initial render
    updateHeading();
    renderChecklist();
    renderCustomItems();
    updateProgress();
});
