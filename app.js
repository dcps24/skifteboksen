// ============================================
// Skifteboksen v1 – app.js
// Checklist logic, localStorage, customization
// ============================================

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
                { id: 'votter', name: 'Votter', note: 'Ekstra pair' },
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
                { id: 'solbriller', name: 'Solbriller', note: 'Beskytter mot sol og snøreflesjson' }
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
                { id: 'handsker', name: 'Handsker', note: 'Bare i frühe vår' },
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
// State Management
// ============================================

let currentState = {
    season: 'vinter',
    context: 'barnehage',
    age: '1-3',
    checkedItems: {},
    customItems: {}
};

// ============================================
// Emoji Mapping
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
    const stored = localStorage.getItem(key);
    if (stored) {
        try {
            currentState.checkedItems = JSON.parse(stored);
        } catch (e) {
            console.error('Failed to parse localStorage:', e);
        }
    }
}

function saveState() {
    const key = getStorageKey(currentState.season, currentState.context, currentState.age);
    localStorage.setItem(key, JSON.stringify(currentState.checkedItems));
    
    // Also save custom items separately
    const customKey = `${key}_custom`;
    localStorage.setItem(customKey, JSON.stringify(currentState.customItems));
}

function loadCustomItems() {
    const customKey = `skifteboksen_${currentState.season}_${currentState.context}_${currentState.age}_custom`;
    const stored = localStorage.getItem(customKey);
    if (stored) {
        try {
            currentState.customItems = JSON.parse(stored);
        } catch (e) {
            console.error('Failed to parse custom items:', e);
        }
    } else {
        currentState.customItems = {};
    }
}

// ============================================
// Checklist Rendering
// ============================================

function renderChecklist() {
    loadState();
    loadCustomItems();
    
    const season = currentState.season;
    const context = currentState.context;
    const age = currentState.age;
    
    // Validate data exists
    if (!checklistData[season] || !checklistData[season][context] || !checklistData[season][context][age]) {
        document.getElementById('checklist').innerHTML = '<p>Ingen items for denne kombinasjonen.</p>';
        return;
    }
    
    const items = checklistData[season][context][age];
    const checklistHTML = items.map(item => {
        const isChecked = currentState.checkedItems[item.id] || false;
        const checkedClass = isChecked ? 'checked' : '';
        
        let variantUI = '';
        if (item.variants && item.variants.length > 0) {
            variantUI = `<span class="item-variant">(${item.variants.join(' / ')})</span>`;
        }
        
        let noteUI = '';
        if (item.note) {
            noteUI = `<div class="checklist-item-note">${item.note}</div>`;
        }
        
        return `
            <div class="checklist-item">
                <input 
                    type="checkbox" 
                    id="item_${item.id}" 
                    ${isChecked ? 'checked' : ''}
                    onchange="toggleItem('${item.id}')"
                    aria-label="${item.name}"
                >
                <label for="item_${item.id}" class="checklist-item-label">
                    ${item.name}${variantUI}
                </label>
                ${noteUI}
            </div>
        `;
    }).join('');
    
    document.getElementById('checklist').innerHTML = checklistHTML;
}

function renderCustomItems() {
    const customHTML = Object.entries(currentState.customItems).map(([id, item]) => {
        const isChecked = currentState.checkedItems[`custom_${id}`] || false;
        return `
            <div class="custom-item">
                <div class="custom-item-content">
                    <input 
                        type="checkbox" 
                        id="custom_item_${id}" 
                        ${isChecked ? 'checked' : ''}
                        onchange="toggleItem('custom_${id}')"
                        aria-label="${item.name}"
                    >
                    <label for="custom_item_${id}" class="custom-item-label">${item.name}</label>
                </div>
                <button 
                    type="button"
                    class="btn-delete-item" 
                    onclick="deleteCustomItem('${id}')"
                    aria-label="Slett ${item.name}"
                >
                    🗑️
                </button>
            </div>
        `;
    }).join('');
    
    document.getElementById('custom-items').innerHTML = customHTML;
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
    const itemName = input.value.trim();
    
    if (!itemName) {
        alert('Skriv inn navn på itemet');
        return;
    }
    
    const id = `custom_${Date.now()}`;
    currentState.customItems[id] = { name: itemName };
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
// Progress Tracking
// ============================================

function updateProgress() {
    const allItems = [
        ...Object.keys(checklistData[currentState.season]?.[currentState.context]?.[currentState.age] || []).map(i => i.id || ''),
        ...Object.keys(currentState.customItems)
    ];
    
    const checkedCount = Object.keys(currentState.checkedItems).filter(key => 
        currentState.checkedItems[key] === true
    ).length;
    
    const totalCount = allItems.length + Object.keys(currentState.customItems).length;
    
    document.getElementById('progress-count').textContent = checkedCount;
    document.getElementById('total-count').textContent = totalCount;
}

// ============================================
// Reset
// ============================================

function resetChecklist() {
    if (confirm('Er du sikker? Dette vil tilbakestille alle sjekkebokser.')) {
        currentState.checkedItems = {};
        saveState();
        renderChecklist();
        renderCustomItems();
        updateProgress();
    }
}

// ============================================
// Event Listeners – Season, Context, Age
// ============================================

document.getElementById('season-select').addEventListener('change', (e) => {
    currentState.season = e.target.value;
    currentState.checkedItems = {}; // Reset checkboxes when changing season
    currentState.customItems = {}; // Reset custom items
    updateHeading();
    renderChecklist();
    renderCustomItems();
    updateProgress();
});

document.getElementById('context-select').addEventListener('change', (e) => {
    currentState.context = e.target.value;
    currentState.checkedItems = {};
    currentState.customItems = {};
    updateHeading();
    renderChecklist();
    renderCustomItems();
    updateProgress();
});

document.getElementById('age-select').addEventListener('change', (e) => {
    currentState.age = e.target.value;
    currentState.checkedItems = {};
    currentState.customItems = {};
    updateHeading();
    renderChecklist();
    renderCustomItems();
    updateProgress();
});

// ============================================
// Heading Updates
// ============================================

function updateHeading() {
    const emoji = seasonEmojis[currentState.season];
    const contextLabels = {
        barnehage: 'barnehage',
        sfo: 'SFO',
        barneskole: 'barneskole'
    };
    
    document.getElementById('season-emoji').textContent = emoji;
    document.getElementById('checklist-heading').textContent = 
        `${currentState.season.charAt(0).toUpperCase() + currentState.season.slice(1)} ${contextLabels[currentState.context]}`;
    
    // Update theme
    document.querySelector('.app-header').className = `app-header ${seasonThemes[currentState.season]}`;
}

// ============================================
// Initialization
// ============================================

window.addEventListener('DOMContentLoaded', () => {
    renderChecklist();
    renderCustomItems();
    updateHeading();
    updateProgress();
});
