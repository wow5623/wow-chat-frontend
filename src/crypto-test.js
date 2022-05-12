const arr = []

for (let i = 0; i < 16; i++) {
    arr.push(i);
}

console.log(arr)

/*const matrix = arr.reduce((acc, currValue, idx) => {

    const innerArrIdx = acc.length;

    if (innerArrIdx % 4 === 0 || acc.length === 0) {
        console.log('ACC1', acc)
        let newArr = []
        newArr.push(currValue)
        return [...acc, newArr]
    }
    else {
        console.log('ACC2', acc)
        return  acc[innerArrIdx - 1].push(currValue)
    }
}, [])*/

function listToMatrix(list, elementsPerSubArray) {
    let matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}

const matrix = listToMatrix(arr, 4)







console.log(matrix)

