
const n = 5
const drawOppositeChristmasTree = (r) =>  {
    let trunk = ''
    for (let i = 0; i < r; i++) {
        let oppositeTree = '';
        // add trunk
        if(i == 0) {
            for (let k = 0; k <= r; k++) {
                if(k < r) {
                    trunk += ' '
                } else {
                    trunk += '|'
                }
            }
        oppositeTree  = trunk + '\n' + oppositeTree

        }
        // add space
        for (let index = 0; i >= index; index++) {
            oppositeTree += ' '
        }
        // add tree
        for (let j = 1; j <  (r - i) * 2; j++) {
            oppositeTree += '*'
        }
        console.log(oppositeTree);
    }
}
drawOppositeChristmasTree(n)

function drawChristmasTree(rows) {
    let tree = '';
    let trunk = '';
    for (let i = 0; i < rows; i++) {
        let line = '';
        // Add spaces
        for (let j = 0; j < rows - i > 0; j++) {
            line += ' ';
        }
        // Add stars
        for (let k = 0; k < 2 * i + 1; k++) {
            line += '*';
        }
        tree += line + '\n';
    }
    // Add trunk
    for (let i = 0; i <= rows; i++) {
        if(rows > i) {
            trunk += ' '  
        } else {
            trunk += '|'  
        }
    }
    tree += trunk + '\n';
    return tree;
}

const numberOfRows = 5;
console.log(drawChristmasTree(numberOfRows));