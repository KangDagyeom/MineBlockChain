const hash = require('crypto-js/sha256');

class Block {
    constructor(prevHash = '', data) {
        this.prevHash = prevHash;
        this.data = data;
        this.timeStamp = new Date(); 
        this.mineVar = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return hash(this.prevHash + this.timeStamp + JSON.stringify(this.data) + this.mineVar).toString();
    }

    mine(difficulty) {
        while (!this.hash.startsWith('0'.repeat(difficulty))) { 
            this.mineVar++;
            this.hash = this.calculateHash();
        }
    }
}

class Blockchain {
    constructor(difficulty) {
        const genesisBlock = new Block('0000', { isGenesis: true });
        this.difficulty = difficulty;
        this.chain = [genesisBlock];
    }

    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.prevHash !== prevBlock.hash) {
                return false;
            }
        }
        return true;
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data) {
        const lastBlock = this.getLastBlock();
        const newBlock = new Block(lastBlock.hash, data);
        console.log('Start mining:');
        console.time('mining...');
        newBlock.mine(this.difficulty);
        console.timeEnd('mining...')
        console.log('End with', newBlock);
        this.chain.push(newBlock);
    }
}

const Hung = new Blockchain(10);

console.log(Hung);

Hung.addBlock({ from: 'Hung', to: 'Hung is riel', amount: 100 });
Hung.addBlock({ from: 'Hung', to: 'Hung is fake', amount: 1230 });
Hung.addBlock({ PhimNet: 'YOUTUBE.com' });
console.log('Chain valid: ', Hung.isValid());