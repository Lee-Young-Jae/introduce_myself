const log = (...args) => {
  if (args.length === 0) console.log();
  else if (args.length === 1) console.log(args[0]);
  else if (args.length === 2) console.log(args[0], args[1]);
  else if (args.length === 3) console.log(args[0], args[1], args[2]);
  else if (args.length === 4) console.log(args[0], args[1], args[2], args[3]);
};

const scrollAnimation = () => {
  const scrollInfo = [
    {
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        content: document.querySelector(".content-0"),
        messageA: document.querySelector(".content-0 .msgA"),
        messageB: document.querySelector(".content-0 .msgB"),
        messageC: document.querySelector(".content-0 .msgC"),
      },
      values: {
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.4 }],
        messageA_translateY_in: [80, 0, { start: 0.1, end: 0.4 }],

        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.6 }],
        messageB_translateY_in: [80, 0, { start: 0.3, end: 0.6 }],

        messageC_opacity_in: [0, 1, { start: 0.5, end: 0.8 }],
        messageC_translateY_in: [80, 0, { start: 0.5, end: 0.8 }],

        messageA_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageA_translateY_out: [0, 10, { start: 0.45, end: 0.5 }],

        messageB_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageB_translateY_out: [0, 10, { start: 0.65, end: 0.7 }],

        messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        messageC_translateY_out: [0, 10, { start: 0.85, end: 0.9 }],
      },
    },
    {
      heightNum: 4,
      scrollHeight: 0,
      objs: {
        content: document.querySelector(".content-1"),
        messageD: document.querySelector(".content-1 .msgD"),
        // messageE: document.querySelector(".content-1 .msgE"),
      },
      values: {
        messageD_opacity_in: [0, 1, { start: 0, end: 0.1 }],
        messageD_translateX_in: [300, 0, { start: 0, end: 0.1 }],

        // messageE_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        // messageE_translateX_in: [-50, 0, { start: 0.1, end: 0.2 }],

        messageD_opacity_out: [1, 0, { start: 0.2, end: 0.25 }],
        messageD_translateX_out: [0, -300, { start: 0.2, end: 0.25 }],

        // messageE_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        // messageE_translateX_out: [0, 50, { start: 0.25, end: 0.3 }],
      },
    },
    {
      heightNum: 12,
      scrollHeight: 0,
      objs: {
        content: document.querySelector(".content-2"),
        messageE: document.querySelector(".content-2 .msgE"),
        messageF: document.querySelector(".content-2 .msgF"),
        messageG: document.querySelector(".content-2 .msgG"),
        messageH: document.querySelector(".content-2 .msgH"),
      },
      values: {
        messageE_opacity_in: [0, 1, { start: 0.0, end: 0.1 }],
        messageE_translateY_in: [-40, 0, { start: 0.0, end: 0.1 }],

        messageE_opacity_out: [1, 0, { start: 0.15, end: 0.2 }],
        messageE_translateY_out: [0, 40, { start: 0.15, end: 0.2 }],

        messageF_opacity_in: [0, 1, { start: 0.2, end: 0.3 }],
        messageF_translateY_in: [-40, 0, { start: 0.2, end: 0.3 }],

        messageF_opacity_out: [1, 0, { start: 0.35, end: 0.4 }],
        messageF_translateY_out: [0, 40, { start: 0.35, end: 0.4 }],

        messageG_opacity_in: [0, 1, { start: 0.4, end: 0.5 }],
        messageG_translateY_in: [-40, 0, { start: 0.4, end: 0.5 }],

        messageG_opacity_out: [1, 0, { start: 0.55, end: 0.6 }],
        messageG_translateY_out: [0, 40, { start: 0.555, end: 0.6 }],

        messageH_opacity_in: [0, 1, { start: 0.6, end: 0.7 }],
        messageH_translateY_in: [-40, 0, { start: 0.6, end: 0.7 }],

        messageH_opacity_out: [1, 0, { start: 0.75, end: 0.8 }],
        messageH_translateY_out: [0, 40, { start: 0.75, end: 0.8 }],
      },
    },
    {
      heightNum: 2,
      scrollHeight: 0,
      objs: {
        content: document.querySelector(".content-3"),
      },
    },
  ];

  let yOffset = 0; // 윈도우의 yOffset 값
  let prevScrollHeight = 0; // 현재 yOffset보다 이전 컨텐츠들의 스크롤 높이 합
  let currentContnet = 0; //현재 활성화 중인 컨텐츠

  let currentYOffset_onCurrentContent = 0;
  let isChangedScene = false;

  const setLayout = () => {
    scrollInfo.map((e) => {
      e.scrollHeight = e.heightNum * window.innerHeight;
      e.objs.content.style.height = `${e.scrollHeight}px`;
    });
    let totalScrollHeight = 0;
    for (let i = 0; i < scrollInfo.length; i++) {
      totalScrollHeight += scrollInfo[i].scrollHeight;
      if (totalScrollHeight > window.pageYOffset) {
        currentContnet = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-section-${currentContnet}`);
  };

  setLayout();

  const calcValues = (message_opacity, currentYOffset_onCurrentContent) => {
    const scrollHeight = scrollInfo[currentContnet].scrollHeight;
    const currentContnetRatio = currentYOffset_onCurrentContent / scrollHeight;

    if (message_opacity.length === 3) {
      const partScrollStart = message_opacity[2].start * scrollHeight;
      const partScrollEnd = message_opacity[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (
        currentYOffset_onCurrentContent >= partScrollStart &&
        currentYOffset_onCurrentContent <= partScrollEnd
      ) {
        return (
          ((currentYOffset_onCurrentContent - partScrollStart) /
            partScrollHeight) *
            (message_opacity[1] - message_opacity[0]) +
          message_opacity[0]
        );
      } else if (currentYOffset_onCurrentContent < partScrollStart) {
        return message_opacity[0];
      } else if (currentYOffset_onCurrentContent > partScrollEnd) {
        return message_opacity[1];
      }
    } else {
      return (
        currentContnetRatio * (message_opacity[1] - message_opacity[0]) +
        message_opacity[0]
      );
    }

    // return message_opacity.length === 3
    //   ? ((currentYOffset_onCurrentContent -
    //       message_opacity[2].start * scrollHeight) /
    //       (message_opacity[2].end * scrollHeight -
    //         message_opacity[2].start * scrollHeight)) *
    //       (message_opacity[1] - message_opacity[0]) +
    //       message_opacity[0]
    //   : currentContnetRatio * (message_opacity[1] - message_opacity[0]) +
    //       message_opacity[0];
  };

  const playAnimation = () => {
    const objs = scrollInfo[currentContnet].objs;
    const values = scrollInfo[currentContnet].values;
    currentYOffset_onCurrentContent = yOffset - prevScrollHeight;
    const scrollHeight = scrollInfo[currentContnet].scrollHeight;
    const scrollRatio = currentYOffset_onCurrentContent / scrollHeight;
    switch (currentContnet) {
      case 0:
        const messageA_opacity_fadeIn = calcValues(
          values.messageA_opacity_in,
          currentYOffset_onCurrentContent
        );
        const messageA_opacity_fadeOut = calcValues(
          values.messageA_opacity_out,
          currentYOffset_onCurrentContent
        );
        const messageA_translateY_fadeIn = calcValues(
          values.messageA_translateY_in,
          currentYOffset_onCurrentContent
        );
        const messageA_translateY_fadeOut = calcValues(
          values.messageA_translateY_out,
          currentYOffset_onCurrentContent
        );

        const messageB_opacity_fadeIn = calcValues(
          values.messageB_opacity_in,
          currentYOffset_onCurrentContent
        );
        const messageB_opacity_fadeOut = calcValues(
          values.messageB_opacity_out,
          currentYOffset_onCurrentContent
        );
        const messageB_translateY_fadeIn = calcValues(
          values.messageB_translateY_in,
          currentYOffset_onCurrentContent
        );
        const messageB_translateY_fadeOut = calcValues(
          values.messageB_translateY_out,
          currentYOffset_onCurrentContent
        );

        const messageC_opacity_fadeIn = calcValues(
          values.messageC_opacity_in,
          currentYOffset_onCurrentContent
        );
        const messageC_opacity_fadeOut = calcValues(
          values.messageC_opacity_out,
          currentYOffset_onCurrentContent
        );
        const messageC_translateY_fadeIn = calcValues(
          values.messageC_translateY_in,
          currentYOffset_onCurrentContent
        );
        const messageC_translateY_fadeOut = calcValues(
          values.messageC_translateY_out,
          currentYOffset_onCurrentContent
        );

        if (scrollRatio <= 0.12) {
          objs.messageA.style.opacity = messageA_opacity_fadeIn;
          objs.messageA.style.transform = `translateY(${messageA_translateY_fadeIn}%)`;
        } else {
          objs.messageA.style.opacity = messageA_opacity_fadeOut;
          objs.messageA.style.transform = `translateY(${messageA_translateY_fadeOut}%)`;
        }

        if (scrollRatio <= 0.42) {
          objs.messageB.style.opacity = messageB_opacity_fadeIn;
          objs.messageB.style.transform = `translateY(${messageB_translateY_fadeIn}%)`;
        } else {
          objs.messageB.style.opacity = messageB_opacity_fadeOut;
          objs.messageB.style.transform = `translateY(${messageB_translateY_fadeOut}%)`;
        }

        if (scrollRatio <= 0.72) {
          objs.messageC.style.opacity = messageC_opacity_fadeIn;
          objs.messageC.style.transform = `translateY(${messageC_translateY_fadeIn}%)`;
        } else {
          objs.messageC.style.opacity = messageC_opacity_fadeOut;
          objs.messageC.style.transform = `translateY(${messageC_translateY_fadeOut}%)`;
        }

        break;
      case 1:
        const messageD_opacity_fadeIn = calcValues(
          values.messageD_opacity_in,
          currentYOffset_onCurrentContent
        );
        const messageD_opacity_fadeOut = calcValues(
          values.messageD_opacity_out,
          currentYOffset_onCurrentContent
        );
        const messageD_translateY_fadeIn = calcValues(
          values.messageD_translateX_in,
          currentYOffset_onCurrentContent
        );
        const messageD_translateY_fadeOut = calcValues(
          values.messageD_translateX_out,
          currentYOffset_onCurrentContent
        );

        // const messageE_opacity_fadeIn = calcValues(
        //   values.messageE_opacity_in,
        //   currentYOffset_onCurrentContent
        // );
        // const messageE_opacity_fadeOut = calcValues(
        //   values.messageE_opacity_out,
        //   currentYOffset_onCurrentContent
        // );
        // const messageE_translateY_fadeIn = calcValues(
        //   values.messageE_translateX_in,
        //   currentYOffset_onCurrentContent
        // );
        // const messageE_translateY_fadeOut = calcValues(
        //   values.messageE_translateX_out,
        //   currentYOffset_onCurrentContent
        // );

        if (scrollRatio <= 0.15) {
          objs.messageD.style.opacity = messageD_opacity_fadeIn;
          objs.messageD.style.transform = `translateX(${messageD_translateY_fadeIn}%)`;
        } else {
          objs.messageD.style.opacity = messageD_opacity_fadeOut;
          objs.messageD.style.transform = `translateX(${messageD_translateY_fadeOut}%)`;
        }

        // if (scrollRatio <= 0.62) {
        //   objs.messageE.style.opacity = messageE_opacity_fadeIn;
        //   objs.messageE.style.transform = `translateX(${messageE_translateY_fadeIn}%)`;
        // } else {
        //   objs.messageE.style.opacity = messageE_opacity_fadeOut;
        //   objs.messageE.style.transform = `translateX(${messageE_translateY_fadeOut}%)`;
        // }

        break;
      case 2:
        const messageE_opacity_fadeIn = calcValues(
          values.messageE_opacity_in,
          currentYOffset_onCurrentContent
        );
        const messageE_opacity_fadeOut = calcValues(
          values.messageE_opacity_out,
          currentYOffset_onCurrentContent
        );
        const messageE_translateY_fadeIn = calcValues(
          values.messageE_translateY_in,
          currentYOffset_onCurrentContent
        );
        const messageE_translateY_fadeOut = calcValues(
          values.messageE_translateY_out,
          currentYOffset_onCurrentContent
        );

        const messageF_opacity_fadeIn = calcValues(
          values.messageF_opacity_in,
          currentYOffset_onCurrentContent
        );
        const messageF_opacity_fadeOut = calcValues(
          values.messageF_opacity_out,
          currentYOffset_onCurrentContent
        );
        const messageF_translateY_fadeIn = calcValues(
          values.messageF_translateY_in,
          currentYOffset_onCurrentContent
        );
        const messageF_translateY_fadeOut = calcValues(
          values.messageF_translateY_out,
          currentYOffset_onCurrentContent
        );

        const messageG_opacity_fadeIn = calcValues(
          values.messageG_opacity_in,
          currentYOffset_onCurrentContent
        );
        const messageG_opacity_fadeOut = calcValues(
          values.messageG_opacity_out,
          currentYOffset_onCurrentContent
        );
        const messageG_translateY_fadeIn = calcValues(
          values.messageG_translateY_in,
          currentYOffset_onCurrentContent
        );
        const messageG_translateY_fadeOut = calcValues(
          values.messageG_translateY_out,
          currentYOffset_onCurrentContent
        );

        const messageH_opacity_fadeIn = calcValues(
          values.messageH_opacity_in,
          currentYOffset_onCurrentContent
        );
        const messageH_opacity_fadeOut = calcValues(
          values.messageH_opacity_out,
          currentYOffset_onCurrentContent
        );
        const messageH_translateY_fadeIn = calcValues(
          values.messageH_translateY_in,
          currentYOffset_onCurrentContent
        );
        const messageH_translateY_fadeOut = calcValues(
          values.messageH_translateY_out,
          currentYOffset_onCurrentContent
        );

        if (scrollRatio <= 0.12) {
          objs.messageE.style.opacity = messageE_opacity_fadeIn;
          objs.messageE.style.transform = `translateY(${messageE_translateY_fadeIn}%)`;
        } else {
          objs.messageE.style.opacity = messageE_opacity_fadeOut;
          objs.messageE.style.transform = `translateY(${messageE_translateY_fadeOut}%)`;
        }

        if (scrollRatio <= 0.32) {
          objs.messageF.style.opacity = messageF_opacity_fadeIn;
          objs.messageF.style.transform = `translateY(${messageF_translateY_fadeIn}%)`;
        } else {
          objs.messageF.style.opacity = messageF_opacity_fadeOut;
          objs.messageF.style.transform = `translateY(${messageF_translateY_fadeOut}%)`;
        }

        if (scrollRatio <= 0.52) {
          objs.messageG.style.opacity = messageG_opacity_fadeIn;
          objs.messageG.style.transform = `translateY(${messageG_translateY_fadeIn}%)`;
        } else {
          objs.messageG.style.opacity = messageG_opacity_fadeOut;
          objs.messageG.style.transform = `translateY(${messageG_translateY_fadeOut}%)`;
        }

        if (scrollRatio <= 0.72) {
          objs.messageH.style.opacity = messageH_opacity_fadeIn;
          objs.messageH.style.transform = `translateY(${messageH_translateY_fadeIn}%)`;
        } else {
          objs.messageH.style.opacity = messageH_opacity_fadeOut;
          objs.messageH.style.transform = `translateY(${messageH_translateY_fadeOut}%)`;
        }
        break;
      case 3:
        break;
      default:
        break;
    }
  };

  let $menuList = Array.from(document.querySelectorAll(".menuItem"));
  // $menuList.map((e) => {
  //   e.addEventListener("click", (event) => {
  //     event.target.classList.add("active");
  //   });
  // });

  const scrollLoop = () => {
    yOffset = window.pageYOffset;
    isChangedScene = false;

    prevScrollHeight = 0;
    for (let i = 0; i < currentContnet; i++) {
      prevScrollHeight += scrollInfo[i].scrollHeight;
    }
    if (yOffset > prevScrollHeight + scrollInfo[currentContnet].scrollHeight) {
      isChangedScene = true;
      currentContnet += 1;
      document.body.setAttribute("id", `show-section-${currentContnet}`);
    }
    if (yOffset < prevScrollHeight) {
      isChangedScene = true;
      if (currentContnet === 0) return;
      currentContnet -= 1;
      document.body.setAttribute("id", `show-section-${currentContnet}`);
    }
    isChangedScene ? null : playAnimation();

    // 메뉴 설정
    $menuList.map((e, i) => {
      e.classList.remove("active");
      if (i === currentContnet) {
        e.classList.add("active");
      }
    });

    // 로딩바 처리
    let pageHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );

    let $loadedBar = document.querySelector(".loadedBar");
    $loadedBar.style.width = `${(yOffset / pageHeight) * 100}%`;
  };
  window.addEventListener("resize", setLayout);
  window.addEventListener("load", setLayout);
  window.addEventListener("scroll", () => {
    scrollLoop();
  });
};

scrollAnimation();
