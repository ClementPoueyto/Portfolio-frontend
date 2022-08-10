
function shuffle(a, rand) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rand* (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function range(start, end) {
    var foo = [];
    for (var i = start; i <= end; i++) {
        foo.push(i);
    }
    return foo
}

function symRange(length) {
    start = -(length - 1) / 2
    end = -start
    var foo = [];
    for (let i = start; i <= end; i++) {
        if (i != 0) foo.push(i);
    }
    return foo
}

function incArray(array, inc) {
    for (let i = 0; i < array.length; i++) {
        array[i] += inc
    }
    return array
}

function xmur3(str) {
    for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
        h = h << 13 | h >>> 19;
    return function() {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}

function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

function random_seed(str){
    let seed = xmur3(str)
    return mulberry32(seed())
    
}
function max(a,b){
    if(a>b)
        return a
    return b
}

function min(a,b){
    if(a<b)
        return a
    return b
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

