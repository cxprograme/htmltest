   $(function() {
        var dragGallery_grid = $(".dragGallery-grid");
        var gridItem = $(".gridItem");
        var dragGallery_dragger = $(".dragGallery-dragger");
        var dragGallery_track = $(".dragGallery-track");
        var dragGallery_prev = $(".dragGallery-prev");
        var dragGallery_next = $(".dragGallery-next");
        var n = (dragGallery_grid.width() - $(window).width()) / (dragGallery_track.width() - 140);
        var x = 70; //鼠标的位置 默认值为70
        dragGallery_dragger.on("mousedown", function() {
            var move = true;
            dragGallery_dragger.css("backgroundColor", "#8aa300");
            $(document).on("mousemove", function(ev) {
                // if (move) {
                var ev = ev || window.event;
                ev.preventDefault();
                x = ev.pageX;
                if (x <= 70) {
                    x = 70;
                } else if (x >= dragGallery_track.width() - 70) {
                    x = dragGallery_track.width() - 70;
                }

               /* dragGallery_dragger.css('transform', "translateX(" + x + "px)");
                dragGallery_grid.css('transform', "translateX(" + (-(x - 70) * n) + "px)");
                // 更换旋转中心轴
                for (var i = 0; i < gridItem.length; i++) {
                    if (gridItem.eq(i).offset().left > dragGallery_track.width() / 2) {
                        gridItem.eq(i).find(".gridSubItem").css("transform-origin", "left");
                        if (gridItem.eq(i).offset().left > (dragGallery_track.width() - 10)) {
                            gridItem.eq(i).find(".gridSubItem").css("transform", "rotateY(45deg)");
                        } else {
                            gridItem.eq(i).find(".gridSubItem").css("transform", "rotateY(0deg)");
                        }
                    } else if (gridItem.eq(i).offset().left < 0) {
                        gridItem.eq(i).find(".gridSubItem").css("transform-origin", "right");
                        if (gridItem.eq(i).offset().left < (-gridItem.width())) {
                            gridItem.eq(i).find(".gridSubItem").css("transform", "rotateY(-45deg)");
                        } else {
                            gridItem.eq(i).find(".gridSubItem").css("transform", "rotateY(0deg)");
                        }


                    }
                }*/
                trans(x);


                // }
            });

            $(document).on("mouseup", function() {
                // move = false;
                $(document).off("mousemove");
                dragGallery_dragger.css("backgroundColor", "#bac614");

            })


        });

        //每次移动的距离
        var distance = (dragGallery_track.width() - 140) / 2;
        dragGallery_prev.on("click", function() {
            var startX = x;
            x -= distance;
            x = Math.max(x, 70);
            var now = new Date();
            var timer = setInterval(function() {
                //时间运动框架
                var temp = new Date();
                var prop = (temp - now) / 1000; //假设是匀速运动，此时时间之比就是移动的距离和总的移动距离之比
                if (prop >= 1) {
                    clearInterval(timer);
                }
                var move = startX + prop * (x - startX);
                /*dragGallery_dragger.css("transform", "translateX(" + move + "px)");
                dragGallery_grid.css('transform', "translateX(" + (-(move - 70) * n) + "px)");
                // 更换旋转中心轴
                for (var i = 0; i < gridItem.length; i++) {
                    if (gridItem.eq(i).offset().left > dragGallery_track.width() / 2) {
                        gridItem.eq(i).find(".gridSubItem").css("transform-origin", "left");
                        if (gridItem.eq(i).offset().left > (dragGallery_track.width() - 10)) {
                            gridItem.eq(i).find(".gridSubItem").css("transform", "rotateY(45deg)");
                        } else {
                            gridItem.eq(i).find(".gridSubItem").css("transform", "rotateY(0deg)");
                        }
                    } else if (gridItem.eq(i).offset().left < 0) {
                        gridItem.eq(i).find(".gridSubItem").css("transform-origin", "right");
                        if (gridItem.eq(i).offset().left < (-gridItem.width())) {
                            gridItem.eq(i).find(".gridSubItem").css("transform", "rotateY(-45deg)");
                        } else {
                            gridItem.eq(i).find(".gridSubItem").css("transform", "rotateY(0deg)");
                        }


                    }
                }*/

                trans(move);
            }, 1000 / 60);


        });
        dragGallery_next.on("click", function() {
            var startX = x;

            x += distance;
            x = Math.min(x, dragGallery_track.width() - 70);
            // dragGallery_dragger.css("transform", "translateX(" + x + "px)");
            var now = new Date();
            var timer = setInterval(function() {
                //时间运动框架
                var temp = new Date();
                var prop = (temp - now) / 1000; //假设是匀速运动，此时时间之比就是移动的距离和总的移动距离之比
                if (prop >= 1) {
                    clearInterval(timer);
                }
                var move = startX + prop * (x - startX);
               /* dragGallery_dragger.css("transform", "translateX(" + move + "px)");
                dragGallery_grid.css('transform', "translateX(" + (-(move - 70) * n) + "px)");
                // 更换旋转中心轴
                for (var i = 0; i < gridItem.length; i++) {
                    if (gridItem.eq(i).offset().left > dragGallery_track.width() / 2) {
                        gridItem.eq(i).find(".gridSubItem").css("transform-origin", "left");
                        if (gridItem.eq(i).offset().left > (dragGallery_track.width() - 10)) {
                            gridItem.eq(i).find(".gridSubItem").css("transform", "rotateY(45deg)");
                        } else {
                            gridItem.eq(i).find(".gridSubItem").css("transform", "rotateY(0deg)");
                        }
                    } else if (gridItem.eq(i).offset().left < 0) {
                        gridItem.eq(i).find(".gridSubItem").css("transform-origin", "right");
                        if (gridItem.eq(i).offset().left < (-gridItem.width())) {
                            gridItem.eq(i).find(".gridSubItem").css("transform", "rotateY(-45deg)");
                        } else {
                            gridItem.eq(i).find(".gridSubItem").css("transform", "rotateY(0deg)");
                        }


                    }
                }*/
                trans(move);
            }, 1000 / 60);

        });

        /**
         * 移动的距离
         * @param  {[type]} dis [description]
         * @return {[type]}     [description]
         */
        function trans(dis) {
            if (dis <= 70) {
                    dis = 70;
                } else if (dis >= dragGallery_track.width() - 70) {
                    dis = dragGallery_track.width() - 70;
                }
            dragGallery_dragger.css("transform", "translateX(" + dis + "px)");
            dragGallery_grid.css('transform', "translateX(" + (-(dis - 70) * n) + "px)");
            // 更换旋转中心轴
            for (var i = 0; i < gridItem.length; i++) {
                if (gridItem.eq(i).offset().left > dragGallery_track.width() / 2) {
                    gridItem.eq(i).find(".gridSubItem").css("transform-origin", "left");
                    if (gridItem.eq(i).offset().left > (dragGallery_track.width()-5)) {
                        gridItem.eq(i).find(".gridSubItem").css("transform", "rotateY(45deg)");
                    } else {
                        gridItem.eq(i).find(".gridSubItem").css("transform", "rotateY(0deg)");
                    }
                } else if (gridItem.eq(i).offset().left < 0) {
                    gridItem.eq(i).find(".gridSubItem").css("transform-origin", "right");
                    if (gridItem.eq(i).offset().left < (-gridItem.width())) {
                        gridItem.eq(i).find(".gridSubItem").css("transform", "rotateY(-45deg)");
                    } else {
                        gridItem.eq(i).find(".gridSubItem").css("transform", "rotateY(0deg)");
                    }


                }
            }
        }

    });