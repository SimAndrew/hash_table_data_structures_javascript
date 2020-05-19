function HashTable(size) {
    this.buckets = Array(size);
    this.numBuckets = this.buckets.length;
};

function HashNode(key, value, next) {
    this.key = key;
    this.value = value;
    this.next = next || null;
};

HashTable.prototype.hash = function(key) {
    var total = 0;
    for (var i = 0; i < key.length; i++){
        total += key.charCodeAt(i);
    }
    var bucket = total % this.numBuckets;
    return bucket;
};

HashTable.prototype.insert = function(key, value) {
    var index = this.hash(key);
    if (!this.buckets[index]) {
        this.buckets[index] = new HashNode(key, value);
    }
    else if (this.buckets[index].key === key) {
        this.buckets[index].value = value;
    }
    else {
        var currentNode = this.buckets[index];
        while (currentNode.next) {
            if (currentNode.next.key === key) {
                currentNode.next.value = value;
                return;
            }
            currentNode = currentNode.next;
        }
        currentNode.next = new HashNode(key, value);
    }
};

HashTable.prototype.get = function(key) {
    var index = this.hash(key);
    if (!this.buckets[index]) return null;
    else {
        var currentNode = this.buckets[index];
        while (currentNode){
            if (currentNode.key === key) return currentNode.value;
            currentNode = currentNode.next;
        }
        return null;
    }
};

HashTable.prototype.retrieveAll = function() {
    var allNodes = [];
    for (var i = 0; i < this.numBuckets; i++) {
        var currentNode = this.buckets[i];
        while (currentNode) {
            allNodes.push(currentNode);
            currentNode = currentNode.next;
        }
    }
    return allNodes;
};

var myHT = new HashTable(30);

myHT.insert('Dean', 'dean@gmail.com');
myHT.insert('Megan', 'megan@gmail.com');
myHT.insert('Dane', 'dane@yahoo.com');
myHT.insert('Dean', 'deanmachine@gmail.com');
myHT.insert('Megan', 'megansmith@gmail.com');
myHT.insert('Dane', 'dane1010@outlook.com');
myHT.insert('Joe', 'joey@facebook.com');
myHT.insert('Samantha', 'samy@twitter.com');


//console.log(myHT.get('Dane')); //get method

//console.log(myHT.buckets); //insert method

//console.log(myHT.hash('Becca')); //hash method (12)

console.log(myHT.retrieveAll()); //retrieveAll method

//A hash table (also called a hash, hash map, unordered map or dictionary) is a data structure that pairs keys to values.
// Its a technique to convert a range of key values into a range of indexes of an array.
// Its used to implement an associative array, a structure that can map keys to values.
