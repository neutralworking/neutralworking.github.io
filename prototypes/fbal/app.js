// Game State
const state = {
    teams: {
        home: null,
        away: null
    },
    match: {
        score: { home: 0, away: 0 },
        xg: { home: 0, away: 0 },
        time: 0,
        logs: []
    }
};

// Mock Data (Moved from index.html)
const TEAMS_DATA = {
    "arsenal": {
        "name": "Arsenal",
        "formation": "4-3-3",
        "color": "#ef4444",
        "starting_xi": [
            { "id": 1, "name": "Aaron Ramsdale", "position": "GK", "level": 8, "classes": ["Blocker", "Harrier"], "stats": { "build_up": 12, "creation": 3, "finishing": 0, "pressing": 6, "destruction": 2, "blocking": 18 } },
            { "id": 2, "name": "Ben White", "position": "DR", "level": 8, "classes": ["Blocker", "Marker"], "stats": { "build_up": 14, "creation": 4, "finishing": 0, "pressing": 10, "destruction": 12, "blocking": 16 } },
            { "id": 3, "name": "William Saliba", "position": "DC", "level": 8, "classes": ["Blocker", "Marker"], "stats": { "build_up": 13, "creation": 3, "finishing": 0, "pressing": 9, "destruction": 11, "blocking": 17 } },
            { "id": 4, "name": "Jurrien Timber", "position": "DL", "level": 7, "classes": ["Marker", "Blocker"], "stats": { "build_up": 15, "creation": 5, "finishing": 0, "pressing": 11, "destruction": 10, "blocking": 14 } },
            { "id": 5, "name": "Declan Rice", "position": "DM", "level": 9, "classes": ["Destroyer", "Controller"], "stats": { "build_up": 15, "creation": 6, "finishing": 2, "pressing": 11, "destruction": 14, "blocking": 13 } },
            { "id": 6, "name": "Martin Ødegaard", "position": "MC", "level": 9, "classes": ["Creator", "Passer"], "stats": { "build_up": 14, "creation": 13, "finishing": 7, "pressing": 9, "destruction": 6, "blocking": 7 } },
            { "id": 7, "name": "Oleksandr Zinchenko", "position": "DL", "level": 7, "classes": ["Passer", "Marker"], "stats": { "build_up": 16, "creation": 7, "finishing": 1, "pressing": 8, "destruction": 7, "blocking": 10 } },
            { "id": 8, "name": "Bukayo Saka", "position": "AMR", "level": 9, "classes": ["Dribbler", "Finisher"], "stats": { "build_up": 12, "creation": 10, "finishing": 11, "pressing": 9, "destruction": 5, "blocking": 5 } },
            { "id": 9, "name": "Kai Havertz", "position": "ST", "level": 8, "classes": ["Finisher", "Creator"], "stats": { "build_up": 10, "creation": 8, "finishing": 12, "pressing": 7, "destruction": 4, "blocking": 3 } },
            { "id": 10, "name": "Leandro Trossard", "position": "AML", "level": 8, "classes": ["Provider", "Dribbler"], "stats": { "build_up": 11, "creation": 9, "finishing": 9, "pressing": 8, "destruction": 4, "blocking": 4 } },
            { "id": 11, "name": "Gabriel Martinelli", "position": "ST", "level": 7, "classes": ["Striker", "Dribbler"], "stats": { "build_up": 9, "creation": 7, "finishing": 10, "pressing": 8, "destruction": 3, "blocking": 2 } }
        ],
        "bench": [
            { "id": 12, "name": "Eddie Nketiah", "position": "ST", "level": 7, "classes": ["Poacher"], "stats": { "build_up": 8, "creation": 5, "finishing": 10, "pressing": 9, "destruction": 2, "blocking": 2 } },
            { "id": 13, "name": "Jorginho", "position": "DM", "level": 8, "classes": ["Regista"], "stats": { "build_up": 16, "creation": 8, "finishing": 4, "pressing": 6, "destruction": 8, "blocking": 8 } }
        ]
    },
    // Adding a simplified PSG for simulation context
    "psg": {
        "name": "PSG",
        "color": "#1e3a8a",
        "starting_xi": [
            { "id": 20, "name": "Donnarumma", "position": "GK", "level": 9, "classes": ["Blocker"], "stats": { "build_up": 14, "creation": 4, "finishing": 0, "pressing": 7, "destruction": 3, "blocking": 19 } },
            { "id": 21, "name": "Hakimi", "position": "DR", "level": 9, "classes": ["Sprinter"], "stats": { "build_up": 13, "creation": 6, "finishing": 2, "pressing": 12, "destruction": 11, "blocking": 12 } },
            { "id": 22, "name": "Marquinhos", "position": "DC", "level": 9, "classes": ["Leader"], "stats": { "build_up": 14, "creation": 4, "finishing": 0, "pressing": 10, "destruction": 12, "blocking": 16 } },
            { "id": 23, "name": "Skriniar", "position": "DC", "level": 8, "classes": ["Destroyer"], "stats": { "build_up": 12, "creation": 3, "finishing": 0, "pressing": 9, "destruction": 13, "blocking": 14 } },
            { "id": 24, "name": "Hernandez", "position": "DL", "level": 8, "classes": ["Engine"], "stats": { "build_up": 12, "creation": 5, "finishing": 1, "pressing": 13, "destruction": 9, "blocking": 13 } },
            { "id": 25, "name": "Ugarte", "position": "DM", "level": 8, "classes": ["Controller"], "stats": { "build_up": 14, "creation": 8, "finishing": 2, "pressing": 8, "destruction": 7, "blocking": 8 } },
            { "id": 26, "name": "Zaire-Emery", "position": "MC", "level": 9, "classes": ["Passer"], "stats": { "build_up": 15, "creation": 12, "finishing": 3, "pressing": 7, "destruction": 6, "blocking": 6 } },
            { "id": 27, "name": "Ruiz", "position": "MC", "level": 8, "classes": ["Passer"], "stats": { "build_up": 14, "creation": 10, "finishing": 3, "pressing": 7, "destruction": 6, "blocking": 6 } },
            { "id": 28, "name": "Dembele", "position": "AMR", "level": 8, "classes": ["Dribbler"], "stats": { "build_up": 10, "creation": 9, "finishing": 10, "pressing": 9, "destruction": 4, "blocking": 3 } },
            { "id": 29, "name": "Ramos", "position": "ST", "level": 8, "classes": ["Finisher"], "stats": { "build_up": 9, "creation": 10, "finishing": 16, "pressing": 11, "destruction": 3, "blocking": 2 } },
            { "id": 30, "name": "Barcola", "position": "AML", "level": 8, "classes": ["Creator"], "stats": { "build_up": 10, "creation": 14, "finishing": 13, "pressing": 6, "destruction": 2, "blocking": 2 } }
        ],
         "stats": { "build_up": 140, "pressing": 90, "creation": 85, "destruction": 70, "finishing": 88, "blocking": 75 }
    }
};

// UI Elements
const UI = {
    pitch: document.getElementById('pitch'),
    bench: document.getElementById('bench'),
    stats: document.getElementById('teamStats'),
    matchLog: document.getElementById('matchLog'),
    modal: document.getElementById('cardModal'),
    modalContent: document.getElementById('modalContent')
};

// In-memory stats cache
let teamStats = {
    build_up: 0, pressing: 0, creation: 0, destruction: 0, finishing: 0, blocking: 0
};

// Initialization
function init() {
    state.teams.home = JSON.parse(JSON.stringify(TEAMS_DATA.arsenal)); // Deep copy
    state.teams.away = JSON.parse(JSON.stringify(TEAMS_DATA.psg)); // Deep copy away for rendering
    
    renderPitch();
    renderBench();
    renderSkills();
    calculateTeamStats();
    updateStatsUI();
    
    setupDragAndDrop();
}

// Rendering
function renderPitch() {
    const pitch = document.getElementById('pitch');
    pitch.innerHTML = '';
    
    // Create 8 columns for Horizontal Pitch
    // Home: GK(0), DEF(1), MID(2), FWD(3) | FWD(4), MID(5), DEF(6), GK(7) :Away
    const cols = [];
    for(let i=0; i<8; i++) {
        const col = document.createElement('div');
        col.className = 'formation-col';
        col.dataset.colIndex = i; // For debugging or specialized dropping
        pitch.appendChild(col);
        cols.push(col);
    }
    
    // Render Home Team (Arsenal)
    state.teams.home.starting_xi.forEach(player => {
        const card = createPlayerCard(player, 'pitch');
        // Determine column based on position
        let colIndex = 2; // Default Mid
        if(player.position === 'GK') colIndex = 0;
        else if(player.position.includes('D')) colIndex = 1;
        else if(player.position.includes('M')) colIndex = 2;
        else if(player.position.includes('ST') || player.position.includes('F') || player.position.includes('A')) colIndex = 3;
        
        cols[colIndex].appendChild(card);
    });

    // Render Away Team (PSG)
    state.teams.away.starting_xi.forEach(player => {
        const card = createPlayerCard(player, 'pitch-away');
        card.style.borderColor = '#93c5fd'; // Light blue for away
        
        let colIndex = 5; // Default Mid
        if(player.position === 'GK') colIndex = 7;
        else if(player.position.includes('D')) colIndex = 6;
        else if(player.position.includes('M')) colIndex = 5;
        else if(player.position.includes('ST') || player.position.includes('F') || player.position.includes('A')) colIndex = 4;
        
        cols[colIndex].appendChild(card);
    });
}

function renderBench() {
    const benchSlots = document.getElementById('benchSlots');
    benchSlots.innerHTML = '';
    
    state.teams.home.bench.forEach(player => {
        const slot = document.createElement('div');
        slot.className = 'card-slot';
        const card = createPlayerCard(player, 'bench');
        slot.appendChild(card);
        benchSlots.appendChild(slot);
    });

    // Add empty slots
    for (let i = 0; i < 3; i++) {
        const slot = document.createElement('div');
        slot.className = 'card-slot';
        benchSlots.appendChild(slot);
    }
}

function renderSkills() {
    const skillSlots = document.getElementById('skillSlots');
    skillSlots.innerHTML = '';
    
    const skills = [
        { name: "Pep Talk", icon: "📢", desc: "+5 Pressing" },
        { name: "Park the Bus", icon: "🚌", desc: "+10 Blocking" },
        { name: "Catenaccio", icon: "🇮🇹", desc: "Change Style" },
        { name: "4-4-2", icon: "📋", desc: "Change Form" }
    ];

    skills.forEach(skill => {
        const slot = document.createElement('div');
        slot.className = 'card-slot';
        
        const card = document.createElement('div');
        card.className = 'player-card'; 
        card.style.background = '#1e293b';
        card.style.borderColor = '#eab308';
        card.style.width = '90px';
        card.style.minHeight = '120px';
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-portrait" style="background:rgba(234, 179, 8, 0.2)">${skill.icon}</div>
                <div class="card-name" style="color:#eab308">${skill.name}</div>
                <div class="card-pos" style="font-size:0.6rem; opacity:0.8">${skill.desc}</div>
            </div>
        `;
        
        slot.appendChild(card);
        skillSlots.appendChild(slot);
    });
}

function createPlayerCard(player, location) {
    const card = document.createElement('div');
    card.className = 'player-card';
    
    // Calculate chemistry (mock logic based on position logic)
    // 8-10: High, 5-7: Med, <5: Low
    const chemScore = Math.floor(Math.random() * 10) + 1; 
    if(chemScore >= 8) card.classList.add('chem-high');
    else if(chemScore >= 5) card.classList.add('chem-med');
    else card.classList.add('chem-low');

    if(location !== 'pitch-away') {
        card.draggable = true;
    } else {
        card.style.opacity = '0.9'; // Dim away players slightly
    }

    card.dataset.id = player.id;
    card.dataset.location = location;
    
    // Stats Grid
    const statsHtml = `
        <div class="card-stats-grid">
            <div class="mini-stat"><span>Bld</span><span>${player.stats.build_up}</span></div>
            <div class="mini-stat"><span>Cre</span><span>${player.stats.creation}</span></div>
            <div class="mini-stat"><span>Fin</span><span>${player.stats.finishing}</span></div>
            <div class="mini-stat"><span>Def</span><span>${player.stats.blocking}</span></div>
        </div>
    `;

    // Card HTML
    card.innerHTML = `
        <div class="card-rating">${player.level}</div>
        <div class="card-inner">
            <div class="card-portrait">👤</div>
            <div class="card-name">${player.name}</div>
            <div class="card-pos">${player.position}</div>
            ${statsHtml}
        </div>
    `;
    
    // Click to expand
    card.addEventListener('click', (e) => {
        showCardDetails(player);
    });
    
    if(location !== 'pitch-away') {
        // Drag Events
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    }
    
    return card;
}

// Drag and Drop Logic
let draggedItem = null;

function setupDragAndDrop() {
    // Add listeners to document to handle dynamic elements better
    document.addEventListener('dragover', e => {
        e.preventDefault();
        const zone = e.target.closest('.card-slot') || e.target.closest('.formation-col');
        if(zone) zone.classList.add('drag-over');
    });

    document.addEventListener('dragleave', e => {
         const zone = e.target.closest('.card-slot') || e.target.closest('.formation-col');
         if(zone) zone.classList.remove('drag-over');
    });

    document.addEventListener('drop', handleDrop);
}

function handleDragStart(e) {
    draggedItem = this; // 'this' is the card element
    setTimeout(() => this.classList.add('dragging'), 0);
    e.dataTransfer.setData('text/plain', this.dataset.id);
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    draggedItem = null;
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
}

function handleDrop(e) {
    e.preventDefault();
    if (!draggedItem) return;

    const targetZone = e.target.closest('.card-slot') || e.target.closest('.formation-col');
    
    // Remove drag-over styling
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));

    if (!targetZone) return; // Drop outside valid zone

    // Prevent dropping on Away team columns (indices 4-7)
    if(targetZone.classList.contains('formation-col')) {
        const colIndex = parseInt(targetZone.dataset.colIndex);
        if(colIndex > 3) return; // Cannot drop on away team
    }

    // Logic:
    // 1. If dropping on empty slot -> Move
    // 2. If dropping on full slot -> Swap
    // 3. If dropping on formation column -> Append (simplified for grid)

    if (targetZone.classList.contains('formation-col')) {
       // Just append to column (flex container)
       targetZone.appendChild(draggedItem);
    } 
    else if (targetZone.classList.contains('card-slot')) {
       if (targetZone.children.length === 0) {
           targetZone.appendChild(draggedItem);
       } else {
           // Swap logic
           const existingCard = targetZone.children[0];
           const originParent = draggedItem.parentNode;
           
           if(originParent) originParent.appendChild(existingCard);
           targetZone.appendChild(draggedItem);
       }
    }
    
    updateGameAfterSwap();
}

function updateGameAfterSwap() {
    // Identify who is on pitch (Columns 0-3 for Home)
    const pitch = document.getElementById('pitch'); // grid container
    const homeCols = Array.from(pitch.children).slice(0, 4);
    
    let newXI = [];
    homeCols.forEach(col => {
        const cards = col.querySelectorAll('.player-card');
        cards.forEach(card => {
             const id = parseInt(card.dataset.id);
             const player = findPlayerById(id);
             if(player) newXI.push(player);
        });
    });
    
    state.teams.home.starting_xi = newXI;
    calculateTeamStats();
    updateStatsUI();
}

function findPlayerById(id) {
    const allHome = [...TEAMS_DATA.arsenal.starting_xi, ...TEAMS_DATA.arsenal.bench];
    return allHome.find(p => p.id === id);
}

// Stats Logic & Simulation
function calculateTeamStats() {
    const xi = state.teams.home.starting_xi;
    teamStats = {
        build_up: xi.reduce((sum, p) => sum + p.stats.build_up, 0),
        creation: xi.reduce((sum, p) => sum + p.stats.creation, 0),
        finishing: xi.reduce((sum, p) => sum + p.stats.finishing, 0),
        pressing: xi.reduce((sum, p) => sum + p.stats.pressing, 0),
        destruction: xi.reduce((sum, p) => sum + p.stats.destruction, 0),
        blocking: xi.reduce((sum, p) => sum + p.stats.blocking, 0)
    };
}

function updateStatsUI() {
    const container = document.getElementById('statsContainer');
    container.innerHTML = '';
    
    Object.entries(teamStats).forEach(([key, value]) => {
        const row = document.createElement('div');
        row.className = 'stat-row';
        row.innerHTML = `
            <span class="stat-label">${key.replace('_', ' ')}</span>
            <span class="stat-value">${value}</span>
        `;
        container.appendChild(row);
    });
}

function advanceMatch() {
    if(state.match.time >= 90) {
        addLog("Match Ended!");
        return;
    }

    state.match.time += 15;
    document.getElementById('matchTime').textContent = `${state.match.time}'`;

    // Simulate simplified mini-segment
    const home = teamStats;
    const away = state.teams.away.stats;
    
    const homePower = (home.creation + home.pressing + Math.random()*20);
    const awayPower = (away.destruction + away.blocking + Math.random()*20);

    if (homePower > awayPower + 10) {
        if(Math.random() > 0.5) {
            state.match.score.home++;
            addLog(`⚽ GOAL! Arsenal scores at ${state.match.time}'`);
        } else {
            addLog(`⚔️ Big chance for Arsenal at ${state.match.time}'`);
        }
    } else if (awayPower > home.blocking + 10) {
        if(Math.random() > 0.5) {
            state.match.score.away++;
            addLog(`⚽ GOAL! PSG scores at ${state.match.time}'`);
        }
    } else {
        addLog(`⏱️ ${state.match.time}': Midfield battle.`);
    }

    updateScoreBoard();
}

function simulateMatch() {
    while(state.match.time < 90) {
        advanceMatch();
    }
}

function updateScoreBoard() {
    document.getElementById('scoreHome').textContent = state.match.score.home;
    document.getElementById('scoreAway').textContent = state.match.score.away;
}

function addLog(msg) {
    const logs = document.getElementById('matchLog');
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = msg;
    logs.appendChild(entry);
    logs.scrollTop = logs.scrollHeight;
}

function resetMatch() {
    state.match.score = { home: 0, away: 0 };
    state.match.time = 0;
    document.getElementById('matchTime').textContent = "0'";
    updateScoreBoard();
    document.getElementById('matchLog').innerHTML = '';
    addLog("Match Reset.");
}

// Detailed View
let radarChart = null;

function showCardDetails(player) {
    const modal = document.getElementById('cardModal');
    const content = document.getElementById('modalContent');
    
    // Fill content
    document.getElementById('detailName').textContent = player.name;
    document.getElementById('detailPos').textContent = player.position;
    document.getElementById('detailClass').textContent = player.classes.join(' • ');
    
    // Chart
    const ctx = document.getElementById('playerRadar').getContext('2d');
    
    if (radarChart) radarChart.destroy();
    
    radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: Object.keys(player.stats),
            datasets: [{
                label: 'Attributes',
                data: Object.values(player.stats),
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: '#3b82f6',
                pointBackgroundColor: '#fff',
                pointBorderColor: '#3b82f6'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: 'rgba(255,255,255,0.1)' },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    pointLabels: { color: '#94a3b8' },
                    suggestedMin: 0,
                    suggestedMax: 20,
                    ticks: { display: false }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('cardModal').classList.remove('active');
}

// Init
window.addEventListener('load', init);
window.onclick = function(event) {
    const modal = document.getElementById('cardModal');
    if (event.target == modal) {
        closeModal();
    }
}
