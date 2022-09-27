let num = 1;

for (let i = 0; i < 1000000; i++) {
  console.log(i);
}
console.log('QQQQQQQQQQQQQQQQQQQ');

const interval = setInterval(() => {
  console.log(num++);
}, 1000);

console.log('PPPPPPPPPPPPPPPPPPPPP');

setTimeout(() => {
  console.log('Timeout!');
  clearInterval(interval);
}, 6000);

/*
출력:
...
999982
999983
999984
999985
999986
999987
999988
999989
999990
999991
999992
999993
999994
999995
999996
999997
999998
999999
QQQQQQQQQQQQQQQQQQQ
PPPPPPPPPPPPPPPPPPPPP
1
2
3
4
5
Timeout!
*/
