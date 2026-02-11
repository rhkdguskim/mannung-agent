#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

// Store memory in the user's home directory under .mannung-agent
const MEMORY_DIR = path.join(os.homedir(), '.mannung-agent');
const MEMORY_FILE = path.join(MEMORY_DIR, 'memory.json');

// Ensure directory exists
if (!fs.existsSync(MEMORY_DIR)) {
    try {
        fs.mkdirSync(MEMORY_DIR, { recursive: true });
    } catch (e) {
        console.error('Failed to create memory directory:', e.message);
        process.exit(1);
    }
}

// Load memory
function loadMemory() {
    if (!fs.existsSync(MEMORY_FILE)) {
        return {};
    }
    try {
        return JSON.parse(fs.readFileSync(MEMORY_FILE, 'utf-8'));
    } catch (e) {
        console.error('Failed to parse memory file:', e.message);
        return {};
    }
}

// Save memory
function saveMemory(data) {
    try {
        fs.writeFileSync(MEMORY_FILE, JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Failed to save memory file:', e.message);
        process.exit(1);
    }
}

const args = process.argv.slice(2);
const command = args[0];
const key = args[1];
const value = args[2];

if (command === 'read') {
    const memory = loadMemory();
    if (key) {
        const val = memory[key];
        console.log(val !== undefined ? val : '');
    } else {
        console.log(JSON.stringify(memory, null, 2));
    }
} else if (command === 'write') {
    if (!key || !value) {
        console.error('Usage: node memory.js write <key> <value>');
        process.exit(1);
    }
    const memory = loadMemory();
    memory[key] = value;
    saveMemory(memory);
    console.log(`Saved: ${key} = ${value}`);
} else {
    console.error('Usage: node memory.js [read <key>|write <key> <value>]');
    process.exit(1);
}
