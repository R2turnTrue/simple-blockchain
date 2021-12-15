const blocks = []



function updateHash() { // 블록내용, nonce, 난이도중 하나의 입력값이 변경되었을 때

    const content = document.getElementById('content')
    const nonceInput = document.getElementById('nonce')
    const hashInput = document.getElementById('hash')
    const merkleInput = document.getElementById('merkle')
    const difficultyInput = document.getElementById('difficulty')
    const registerChainButton = document.getElementById('registerChain')

    const merkle = sha256(content.value) // 블록내용을 sha256으로 변환
                                         // 데이터가 한개기 때문에 굳이 머클트리를 구현할 필요가 없음

    hashInput.value = sha256(merkle + nonceInput.value) // 보여지는 해시는 머클루트 + 논스를 합쳐서 해시한 것
    merkleInput.value = merkle

    let zero = ''
    for (let i = 0; i < parseInt(difficultyInput.value); i++) {
        zero += '0'
    }

    // 만약 입력한 논스가
    // 마지막 블록의 논스보다 더 크고(암호화폐 규칙)
    let success = hashInput.value.startsWith(zero) && (blocks.length < 1 || blocks[blocks.length - 1].nonce < parseInt(nonceInput.value))
    // 해시값의 조건이 만족할경우 체인 등록 버튼 활성화
    // (해시의 앞부분의 0의 갯수가 난이도 수)
    // 아닐경우 비활성화
    registerChainButton.disabled = !success

    return success

}

function mine() { // 채굴 버튼을 눌렀을 때

    let interval

    interval = setInterval(() => {
        // 계속 반복합니다.
        const nonceInput = document.getElementById('nonce')
        // Nonce를 1씩 늘려갑니다.
        nonceInput.value = parseInt(nonceInput.value) + 1

        if(updateHash()) {
            // 조건에 만족하는 해시를 찾을경우
            // 반복을 종료합니다.
            clearInterval(interval)
        }
    }, 1)



}

function registerChain() { // 체인 등록 버튼을 눌렀을 때
    
    const zone = document.getElementById('zone')

    const content = document.getElementById('content')
    const nonceInput = document.getElementById('nonce')
    const hashInput = document.getElementById('hash')
    const merkleInput = document.getElementById('merkle')
    const difficultyInput = document.getElementById('difficulty')

    // 화면에 블록 내용, 논스, 해시, 머클 루트, 난이도를 출력함
    zone.innerHTML += `${content.value} - ${nonceInput.value} - ${hashInput.value} - ${merkleInput.value} - ${difficultyInput.value}<br/><br/>`

    blocks.push({
        content: content.value,
        nonce: nonceInput.value,
        hash: hashInput.value,
        merkle: merkleInput.value,
        difficulty: difficultyInput.value
    })

    content.value = ''
    hashInput.value = ''
    merkleInput.value = ''

}