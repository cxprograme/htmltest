var svg = Snap("#svg");
    var navTrigger = document.querySelector("#navTrigger");
    var navContainer = document.querySelector(".navContainer");
    var menu = document.querySelector("main .fixedNav .navContainer .nav-menu .menu");
    var sectionHeader=document.querySelector("#what_we_do .sectionHeader");
    var p = svg.paper.path("M1000,0C1000,0,0,0,0,0C0,0,116,97,393,100C681,103,593,38,1000,0").attr({
        fill: "#eceff0"
    });
    var mark = true;
    navTrigger.onclick = function() {
        if (mark) {
            p.animate({
                d: "M1000,0C1000,0,0,0,0,0C0,0,0,100,0,100C0,100,1000,100,1000,100",
                fill: "#eceff0"
            }, 1000, mina.linear);
            this.style.transform = "rotate(-90deg)";
            // navContainer 位移
            navContainer.style.transform = "translate3d(0,0,0)";

            menu.classList.add('menu-show');

            sectionHeader.style.margin="3.5em auto .5em";
            mark = false;
        } else {
            p.animate({
                d: "M1000,0C1000,0,0,0,0,0C0,0,116,97,393,100C681,103,593,38,1000,0",
                fill: "#eceff0"
            }, 1000, mina.linear);
            this.style.transform = "rotate(0deg)";
            navContainer.style.transform = "translate3d(0,-80px,0)";
            menu.classList.remove('menu-show');
            sectionHeader.style.margin="2em auto";
            mark = true;
        }

    };

    