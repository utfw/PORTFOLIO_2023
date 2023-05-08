import { Branch } from './branch.js';

export class Tree {
  constructor(ctx, posX, posY) {
    this.ctx = ctx;
    this.posX = posX;
    this.posY = posY;
    this.branches = []; // 가지들을 담을 공간
    this.depth = 2;

    this.init();
  }

  init() {
 // 시작 각도는 -90도를 주어 아래에서 위로 나무 기둥이 자라도록한다.
    // 시작 depth는 0으로 준다.
    this.createBranch(this.posX, this.posY, -90, 0);
    this.draw(this.ctx);
  }

  createBranch(startX, startY, angle, depth) {
    if (depth === this.depth) return; // 뎁스가 같으면 리턴으로 종료시킴. 
    
    
    // 가지 생성
    const len = 100;
    const endX = startX + this.cos(angle) * len;
    const endY = startY + this.sin(angle) * len;

    this.branches.push(new Branch(startX, startY, endX, endY));

    this.createBranch(endX, endY, angle - 30, depth + 1);
    this.createBranch(endX, endY, angle + 30, depth + 1);
  }

  draw(ctx) {
    // 가지들을 캔버스에 draw
    for (let i = 0; i < this.branches.length; i++) {
      this.branches[i].draw(ctx);
    }
  }

   // 각도 관련 함수 추가
   cos(angle) {
    return Math.cos(this.degToRad(angle));
  }
  sin(angle) {
    return Math.sin(this.degToRad(angle));
  }
  degToRad(angle) {
    return (angle / 180.0) * Math.PI;
  }
}

