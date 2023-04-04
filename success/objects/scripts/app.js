$(document).ready(function(){
    let GLOBAL_index__sliderHowToWork = 0;
    //script

    $("#listNavSct li").click(function(){
        if($(this).hasClass("active")) return;
        
        let indexClicked = $(this).index();
        changedSlideSTrice(indexClicked);
    });

    // 
    // animation 

    /** 
     * animation button present video
     * **/
    $("#presentVideo").mouseenter(function(){
        $(this).children(".firstLine").css("animation", ".5s PresentVideo ease-in-out infinite");
        $(this).children(".secondLine").css("animation", ".8s PresentVideo ease-in-out infinite");
    });

    $("#presentVideo").mouseleave(function(){
        $(this).children(".firstLine").css("animation", "2s PresentVideo ease-in-out infinite");
        $(this).children(".secondLine").css("animation", "2s PresentVideo 3s ease-in-out infinite");
    });
    /** 
     * animation scroll button on hover
     * **/
    $(".scrollButton").mouseenter(function(){
        const CONTAINER = $(this).find(".wrapper");
        CONTAINER.css("top", "-10px");
    });

    $(".scrollButton").mouseleave(function(){
        const CONTAINER = $(this).find(".wrapper");
        CONTAINER.css("top", "-110px");
    });


    //
    //
    // ALL MAIN FUNC
    //
    //


    /**
     * AnimationFirstSection function
     */
    

    function FUNCAnimMainSection(){
        $(".main_section > .right_display > img").each(function(index){
            let $el = $(this);
            setTimeout(function(){
                $el.prev().addClass("blur");
                $el.removeClass("blur");
            },index*1000);
        });
        $(".main_section > .right_display > img").eq(6).addClass("blur");
    }
    FUNCAnimMainSection(); //start function in moment
    let animMainSection = setInterval(FUNCAnimMainSection, 7000); //start recurse
    
    /**
     * changed slide func
     */

    function changedSlideSTrice(index){
        let timeAnimation;
        if(GLOBAL_index__sliderHowToWork > index){
            // toTop
            timeAnimation = setInterval(function(){
                if(GLOBAL_index__sliderHowToWork == index+1){
                    clearInterval(timeAnimation);
                }

                GLOBAL_index__sliderHowToWork--;
                showSlideTrice(GLOBAL_index__sliderHowToWork, true);
            },400);

        }else{
            // toDown
            timeAnimation = setInterval(function(){
                if(GLOBAL_index__sliderHowToWork == index-1){
                    clearInterval(timeAnimation);
                }

                GLOBAL_index__sliderHowToWork++;
                showSlideTrice(GLOBAL_index__sliderHowToWork, false);
            },400);
        }
    }

    function showSlideTrice(index, directUp){
        const CONTAINER = $(".section__hotToWork .rightChangedBlocks");
        const NAVIGATION = $(".section__hotToWork #listNavSct");
        const MAIN_LIGHT = $(".section__hotToWork #mainLight_s2");
        const MAIN_INFO = $(".section__hotToWork #mainInfo_S2");
        const MAIN_ADD = $(".section__hotToWork #mainInfo_S2");
        let actualIndex = index;

        // change navActive
        NAVIGATION.children(".active").removeClass("active");
        NAVIGATION.children().eq(index).addClass("active");


        // change Header
        CONTAINER.find(".headerH2").children(".active").css({
            "transform": "rotateX(90deg) translateY(-50px)",
            opacity: 0,
            top: 30
        });
        // to
        CONTAINER.find(".headerH2").children(".active").removeClass("active");
        CONTAINER.find(".headerH2").children().eq(index).addClass("active");
        CONTAINER.find(".headerH2").children().eq(index).css({
            top: 0,
            opacity: 1,
            "transform": "rotateX(0) translateY(0)",
        });
        // move light
        let WindowHeight = (window.innerHeight)+500;
        let PlusValueHeightWindow;
        let MinusValueHeightWindow;
        if(directUp){
            actualIndex+=1;
            PlusValueHeightWindow = `-${WindowHeight}px`;
            MinusValueHeightWindow = `${WindowHeight}px`;
        }else{
            actualIndex-=1;
            PlusValueHeightWindow = `${WindowHeight}px`;
            MinusValueHeightWindow = `-${WindowHeight}px`;
        }

        MAIN_LIGHT.css("transition", ".3s ease-in-out");
        MAIN_LIGHT.css("transform", `translateY(${MinusValueHeightWindow})`);
        setTimeout(function(){
            MAIN_LIGHT.css("transition", "none");
            MAIN_LIGHT.css("transform", `translateY(${PlusValueHeightWindow})`);
            setTimeout(function(){
                MAIN_LIGHT.css("transition", ".3s ease-in-out");
                MAIN_LIGHT.css("transform", "translateY(0)");
            },10);
        },200);
        // change body

        //change additional
        

        // changed text
        let oldElem = MAIN_INFO.children(`div[data-inex=${actualIndex}]`);
        let newElem = MAIN_INFO.children(`div[data-inex=${index}]`);

        oldElem.children(".wrapper").each(function(){
            $(this).css({
                "transform": "translateY(-10px)",
                opacity: 0
            });
        });

        newElem.children(".wrapper").each(function(){
            $(this).css({
                "transform": "translateY(0)",
                opacity: 1
            });
        });
        
        
        
    }
});