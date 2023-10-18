 const sequence = "ababc"
 const word = "ab"



 var maxRepeating = function(sequence, word) {
    let maxCount = 0;
    let pattern = word;

    while (sequence.includes(pattern)) {
        pattern += word;
        maxCount++;
    }

    return maxCount;
};


 console.log(maxRepeating(sequence,word));