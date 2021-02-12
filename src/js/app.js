import gsap from "gsap"
import barba from '@barba/core';
// import * as $ from 'jquery';

barba.init({
  transitions: [{
    name: 'opacity-transition',
    from: {
        namespace: [
          'home'
        ]
      },
    leave(data) {
      return new Promise((resolve, reject) => {
        const clicked = data.trigger;
        const tl = gsap.timeline({
          onComplete: resolve
        })

        const { left } = clicked.getBoundingClientRect();
        const cloned = clicked.cloneNode(true);

        cloned.classList.add('is-cloned');

        tl.set(cloned, { x: left }, 0);
        data.current.container.appendChild(cloned);

        const screenWidth = $(window).width();
        const bg = $(cloned).find(".item__bg");
        const title = $(cloned).find(".item__title");

        tl.to(cloned, {
          duration: 0.5,
          x: 0,
          width: screenWidth
        }, 0)
          .to(title, {
            duration: 0.5,
            y: 100,
            opacity: 0,
          }, 0);

        tl.to(bg, {
          duration: 0.5,
          x: 0
        }, 0)
      })
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0
      });
    }
  }]
});

// barba.init({
//   transitions: [{
//     name: 'opacity-transition',
//     leave(data) {
//       return gsap.to(data.current.container, {
//         opacity: 0
//       });
//     },
//     enter(data) {
//       return gsap.from(data.next.container, {
//         opacity: 0
//       });
//     }
//   }]
// });