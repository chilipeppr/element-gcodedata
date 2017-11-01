/* global requirejs cprequire cpdefine chilipeppr THREE */
// Defining the globals above helps Cloud9 not show warnings for those variables

// ChiliPeppr Widget/Element Javascript

requirejs.config({
    /*
    Dependencies can be defined here. ChiliPeppr uses require.js so
    please refer to http://requirejs.org/docs/api.html for info.
    
    Most widgets will not need to define Javascript dependencies.
    
    Make sure all URLs are https and http accessible. Try to use URLs
    that start with // rather than http:// or https:// so they simply
    use whatever method the main page uses.
    
    Also, please make sure you are not loading dependencies from different
    URLs that other widgets may already load like jquery, bootstrap,
    three.js, etc.
    
    You may slingshot content through ChiliPeppr's proxy URL if you desire
    to enable SSL for non-SSL URL's. ChiliPeppr's SSL URL is
    https://i2dcui.appspot.com which is the SSL equivalent for
    http://chilipeppr.com
    */
    paths: {
        // Example of how to define the key (you make up the key) and the URL
        // Make sure you DO NOT put the .js at the end of the URL
        // SmoothieCharts: '//smoothiecharts.org/smoothie',
    },
    shim: {
        // See require.js docs for how to define dependencies that
        // should be loaded before your script/widget.
    }
});

// Test this element. This code is auto-removed by the chilipeppr.load()
cprequire_test(["inline:com-chilipeppr-elem-gcodedata"], function (gcd) {
    console.log("test running of " + gcd.id);
    $.each(gcd.gcode, function (indx, val) {
        $.each(val, function (i, d) {
            $('body').append(i + " : " + d + ", ");
        });
        $('body').append("<br/><br/>");
    });
    //gcd.init();

} /*end_test*/ );

cpdefine("inline:com-chilipeppr-elem-gcodedata", ["chilipeppr_ready"], function () {
    return {
        id: "inline:com-chilipeppr-elem-gcodedata",
        name: "Element / Gcode Data",
        desc: "List of Gcode commands from Wikipedia",
        url: "(auto fill by runme.js)",       // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)",   // The standalone working widget so can view it working by itself
        publish: null,
        subscribe: null,
        init: function () {
            //console.log("init called");
            console.log("Element / Gcode Data done loading.");
        },
        gcode: [{
            code: "G00",
            desc: "Rapid positioning",
            m: "M",
            t: "T",
            info: "On 2- or 3-axis moves, G00 (unlike <a href=\"#G01\">G01</a>) traditionally does not necessarily move in a single straight line between start point and end point. It moves each axis at its max speed until its vector is achieved. Shorter vector usually finishes first (given similar axis speeds). This matters because it may yield a dog-leg or hockey-stick motion, which the programmer needs to consider depending on what obstacles are nearby, to avoid a crash. Some machines offer interpolated rapids as a feature for ease of programming (safe to assume a straight line)."
        }, {
            code: "G01",
            desc: "<a href=\"/wiki/Linear_interpolation\" title=\"Linear interpolation\">Linear interpolation</a>",
            m: "M",
            t: "T",
            info: "The most common workhorse code for feeding during a cut. The program specs the start and end points, and the control automatically calculates (<a href=\"/wiki/Interpolation\" title=\"Interpolation\">interpolates</a>) the intermediate points to pass through that will yield a straight line (hence \"<a href=\"/wiki/Linear\" title=\"Linear\" class=\"mw-redirect\">linear</a>\"). The control then calculates the angular velocities at which to turn the axis <a href=\"/wiki/Leadscrew\" title=\"Leadscrew\">leadscrews</a> via their servomotors or stepper motors. The computer performs thousands of calculations per second, and the motors react quickly to each input. Thus the actual toolpath of the machining takes place with the given feedrate on a path that is accurately linear to within very small limits."
        }, {
            code: "G02",
            desc: "Circular interpolation, clockwise",
            m: "M",
            t: "T",
            info: "Very similar in concept to G01. Again, the control <a href=\"/wiki/Interpolation\" title=\"Interpolation\">interpolates</a> intermediate points and commands the servo- or stepper motors to rotate the amount needed for the leadscrew to translate the motion to the correct tool tip positioning. This process repeated thousands of times per minute generates the desired toolpath. In the case of G02, the interpolation generates a circle rather than a line. As with G01, the actual toolpath of the machining takes place with the given feedrate on a path that accurately matches the ideal (in G02's case, a circle) to within very small limits. In fact, the interpolation is so precise (when all conditions are correct) that milling an interpolated circle can obviate operations such as drilling, and often even fine boring. <b>Addresses for radius or arc center:</b> G02 and G03 take either an <a href=\"#R\">R</a> address (for the radius desired on the part) or <a href=\"#I\">IJK</a> addresses (for the component vectors that define the vector from the arc start point to the arc center point). <b>Cutter comp:</b> On most controls you cannot start <a href=\"#G41\">G41</a> or <a href=\"#G42\">G42</a> in <a href=\"#G02\">G02</a> or <a href=\"#G03\">G03</a> modes. You must already have compensated in an earlier <a href=\"#G01\">G01</a> block. Often a short linear lead-in movement will be programmed, merely to allow cutter compensation before the main event, the circle-cutting, begins. <b>Full circles:</b> When the arc start point and the arc end point are identical, a 360° arc, a full circle, will be cut. (Some older controls cannot support this because arcs cannot cross between quadrants of the cartesian system. Instead, four quarter-circle arcs are programmed back-to-back.)"
        }, {
            code: "G03",
            desc: "Circular interpolation, counterclockwise",
            m: "M",
            t: "T",
            info: "Same corollary info as for G02."
        }, {
            code: "G04",
            desc: "Dwell",
            m: "M",
            t: "T",
            info: "Takes an address for dwell period (may be <a href=\"#X\">X</a>, <a href=\"#U\">U</a>, or <a href=\"#P\">P</a>). The dwell period is specified by a control parameter, typically set to <a href=\"/wiki/Millisecond\" title=\"Millisecond\">milliseconds</a>. Some machines can accept either X1.0 (<a href=\"/wiki/Second\" title=\"Second\">s</a>) or P1000 (<a href=\"/wiki/Millisecond\" title=\"Millisecond\">ms</a>), which are equivalent. <b><span id=\"Choosing_dwell_duration\">Choosing dwell duration</span></b>: Often the dwell needs only to last one or two full spindle rotations. This is typically much less than one second. Be aware when choosing a duration value that a long dwell is a waste of cycle time. In some situations it won't matter, but for high-volume repetitive production (over thousands of cycles), it is worth calculating that perhaps you only need 100 <a href=\"/wiki/Millisecond\" title=\"Millisecond\">ms</a>, and you can call it 200 to be safe, but 1000 is just a waste (too long)."
        }, {
            code: "G05",
            ext: "P10000",
            desc: "High-precision contour control (HPCC)",
            m: "M",
            t: "",
            info: "Uses a deep look-ahead <a href=\"/wiki/Data_buffer\" title=\"Data buffer\">buffer</a> and simulation processing to provide better axis movement acceleration and deceleration during contour milling"
        }, {
            code: "G05.1",
            ext: "Q1.",
            desc: "AI Advanced Preview Control",
            m: "M",
            t: "",
            info: "Uses a deep look-ahead <a href=\"/wiki/Data_buffer\" title=\"Data buffer\">buffer</a> and simulation processing to provide better axis movement acceleration and deceleration during contour milling"
        }, {
            code: "G06.1",
            ext: "G06.1",
            desc: "Non Uniform Rational B Spline Machining",
            m: "M",
            t: "",
            info: "Activates Non-Uniform Rational B Spline for complex curve and waveform machining (this code is confirmed in Mazatrol 640M ISO Programming)"
        }, {
            code: "G07",
            desc: "Imaginary axis designation",
            m: "M",
            t: "",
            info: "&nbsp;"
        }, {
            code: "G09",
            desc: "Exact stop check, non-modal",
            m: "M",
            t: "T",
            info: "The modal version is <a href=\"#G61\">G61</a>."
        }, {
            code: "G10",
            desc: "Programmable data input",
            m: "M",
            t: "T",
            info: "&nbsp;"
        }, {
            code: "G11",
            desc: "Data write cancel",
            m: "M",
            t: "T",
            info: "&nbsp;"
        }, {
            code: "G12",
            desc: "Full-circle interpolation, clockwise",
            m: "M",
            t: "",
            info: "Fixed cycle for ease of programming 360° circular interpolation with blend-radius lead-in and lead-out. Not standard on Fanuc controls."
        }, {
            code: "G13",
            desc: "Full-circle interpolation, counterclockwise",
            m: "M",
            t: "",
            info: "Fixed cycle for ease of programming 360° circular interpolation with blend-radius lead-in and lead-out. Not standard on Fanuc controls."
        }, {
            code: "G17",
            desc: "XY plane selection",
            m: "M",
            t: "",
            info: "&nbsp;"
        }, {
            code: "G18",
            desc: "ZX plane selection",
            m: "M",
            t: "T",
            info: "On most CNC lathes (built 1960s to 2000s), ZX is the only available plane, so no <a href=\"#G17\">G17</a> to <a href=\"#G19\">G19</a> codes are used. This is now changing as the era begins in which live tooling, multitask/multifunction, and mill-turn/turn-mill gradually become the \"new normal\". But the simpler, traditional form factor will probably not disappear—it will just move over to make room for the newer configurations. See also <a href=\"#V\">V</a> address."
        }, {
            code: "G19",
            desc: "YZ plane selection",
            m: "M",
            t: "",
            info: "&nbsp;"
        }, {
            code: "G20",
            desc: "Programming in <a href=\"/wiki/Inch\" title=\"Inch\">inches</a>",
            m: "M",
            t: "T",
            info: "Somewhat uncommon except in USA and (to lesser extent) Canada and UK. However, in the global marketplace, competence with both G20 and G21 always stands some chance of being necessary at any time. The usual minimum increment in G20 is one ten-thousandth of an inch (0.0001\"), which is a larger distance than the usual minimum increment in G21 (one thousandth of a millimeter, .001&nbsp;mm, that is, one <a href=\"/wiki/Micrometre\" title=\"Micrometre\">micrometre</a>). This physical difference sometimes favors G21 programming."
        }, {
            code: "G21",
            desc: "Programming in <a href=\"/wiki/Millimeter\" title=\"Millimeter\" class=\"mw-redirect\">millimeters</a> (mm)",
            m: "M",
            t: "T",
            info: "Prevalent worldwide. However, in the global marketplace, competence with both G20 and G21 always stands some chance of being necessary at any time."
        }, {
            code: "G28",
            desc: "Return to home position (machine zero, aka machine reference point)",
            m: "M",
            t: "T",
            info: "Takes X Y Z addresses which define the intermediate point that the tool tip will pass through on its way home to machine zero. They are in terms of part zero (aka program zero), NOT machine zero."
        }, {
            code: "G30",
            desc: "Return to secondary home position (machine zero, aka machine reference point)",
            m: "M",
            t: "T",
            info: "Takes a P address specifying <i>which</i> machine zero point is desired, <i>if</i> the machine has several secondary points (P1 to P4). Takes X Y Z addresses which define the intermediate point that the tool tip will pass through on its way home to machine zero. They are in terms of part zero (aka program zero), NOT machine zero."
        }, {
            code: "G31",
            desc: "Skip function (used for probes and tool length measurement systems)",
            m: "M",
            t: "",
            info: "&nbsp;"
        }, {
            code: "G32",
            desc: "Single-point threading, longhand style (if not using a cycle, e.g., <a href=\"#G76_thread_on_lathe\">G76</a>)",
            m: "",
            t: "T",
            info: "Similar to <a href=\"#G01\">G01</a> linear interpolation, except with automatic spindle synchronization for <a href=\"/wiki/Threading_(manufacturing)#Single-point_threading\" title=\"Threading (manufacturing)\">single-point threading</a>."
        }, {
            code: "G33",
            desc: "Constant-<a href=\"/wiki/Screw_thread#Lead.2C_pitch.2C_and_starts\" title=\"Screw thread\">pitch</a> threading",
            m: "M",
            t: "",
            info: "&nbsp;"
        }, {
            code: "G33 T",
            desc: "Single-point threading, longhand style (if not using a cycle, e.g., <a href=\"#G76_thread_on_lathe\">G76</a>)",
            m: "",
            t: "T",
            info: "Some lathe controls assign this mode to G33 rather than G32."
        }, {
            code: "G34",
            desc: "Variable-pitch threading",
            m: "M",
            t: "",
            info: "&nbsp;"
        }, {
            code: "G40",
            desc: "Tool radius compensation off",
            m: "M",
            t: "T",
            info: "Turn off <a href=\"/wiki/Cutter_location\" title=\"Cutter location\">cutter radius compensation (CRC)</a>. Cancels G41 or G42."
        }, {
            code: "G41",
            desc: "Tool radius compensation left",
            m: "M",
            t: "T",
            info: "Turn on <a href=\"/wiki/Cutter_location\" title=\"Cutter location\">cutter radius compensation (CRC)</a>, left, for climb milling.<br><b>Milling:</b> Given righthand-helix cutter and <a href=\"#M03\">M03</a> spindle direction, G41 corresponds to <a href=\"/wiki/Milling_cutter#Conventional_milling_versus_climb_milling\" title=\"Milling cutter\">climb milling (down milling)</a>. Takes an address (<a href=\"#D\">D</a> or <a href=\"#H\">H</a>) that calls an offset register value for radius.<br><b>Turning:</b> Often needs no D or H address on lathes, because whatever tool is active automatically calls its geometry offsets with it. (Each turret station is bound to its geometry offset register.)<p>G41 and G42 for milling has been partially automated and obviated (although not completely) since <a href=\"/wiki/Computer-aided_manufacturing\" title=\"Computer-aided manufacturing\">CAM</a> programming has become more common. CAM systems allow the user to program as if with a zero-diameter cutter. The fundamental concept of cutter radius compensation is still in play (i.e., that the surface produced will be distance R away from the cutter center), but the programming mindset is different; the human does not choreograph the toolpath with conscious, painstaking attention to G41, G42, and G40, because the CAM software takes care of it. The software has various CRC mode selections, such as <i>computer, control, wear, reverse wear, off</i>, some of which do not use G41/G42 at all (good for roughing, or wide finish tolerances), and others which use it so that the wear offset can still be tweaked at the machine (better for tight finish tolerances).</p>\""
        }, {
            code: "G42",
            desc: "Tool radius compensation right",
            m: "M",
            t: "T",
            info: "Turn on <a href=\"/wiki/Cutter_location\" title=\"Cutter location\">cutter radius compensation (CRC)</a>, right, for conventional milling. Similar corollary info as for <a href=\"#G41\">G41</a>. Given righthand-helix cutter and M03 spindle direction, G42 corresponds to <a href=\"/wiki/Milling_cutter#Conventional_milling_versus_climb_milling\" title=\"Milling cutter\">conventional milling (up milling)</a>."
        }, {
            code: "G43",
            desc: "Tool height offset compensation negative",
            m: "M",
            t: "",
            info: "Takes an address, usually H, to call the tool length offset register value. The value is <i>negative</i> because it will be <i>added</i> to the gauge line position. G43 is the commonly used version (vs G44)."
        }, {
            code: "G44",
            desc: "Tool height offset compensation positive",
            m: "M",
            t: "",
            info: "Takes an address, usually H, to call the tool length offset register value. The value is <i>positive</i> because it will be <i>subtracted</i> from the gauge line position. G44 is the seldom-used version (vs G43)."
        }, {
            code: "G45",
            desc: "Axis offset single increase",
            m: "M",
            t: "",
            info: "&nbsp;"
        }, {
            code: "G46",
            desc: "Axis offset single decrease",
            m: "M",
            t: "",
            info: "&nbsp;"
        }, {
            code: "G47",
            desc: "Axis offset double increase",
            m: "M",
            t: "",
            info: "&nbsp;"
        }, {
            code: "G48",
            desc: "Axis offset double decrease",
            m: "M",
            t: "",
            info: "&nbsp;"
        }, {
            code: "G49",
            desc: "Tool length offset compensation cancel",
            m: "M",
            t: "",
            info: "Cancels <a href=\"#G43\">G43</a> or <a href=\"#G44\">G44</a>."
        }, {
            code: "G50",
            ext: "RPM clamp",
            desc: "Define the maximum spindle speed",
            m: "",
            t: "T",
            info: "Takes an <a href=\"#S\">S</a> address integer which is interpreted as rpm. Without this feature, <a href=\"#G96\">G96</a> mode (CSS) would rev the spindle to \"wide open throttle\" when closely approaching the axis of rotation."
        }, {
            code: "G50 Scaling",
            ext: "Scaling off",
            desc: "Scaling function cancel",
            m: "M",
            t: "",
            info: "&nbsp;"
        }, {
            code: "G50 Position",
            ext: "Position register",
            desc: "Position register (programming of vector from part zero to tool tip)",
            m: "",
            t: "T",
            info: "Position register is one of the original methods to relate the part (program) coordinate system to the tool position, which indirectly relates it to the machine coordinate system, the only position the control really \"knows\". Not commonly programmed anymore because <a href=\"#G54_to_G59\">G54 to G59</a> (WCSs) are a better, newer method. Called via G50 for turning, <a href=\"#G92_position_register\">G92</a> for milling. Those G addresses also have alternate meanings (which see). Position register can still be useful for datum shift programming. The \"manual absolute\" switch, which has very few useful applications in WCS contexts, was more useful in position register contexts, because it allowed the operator to move the tool to a certain distance from the part (for example, by touching off a 2.0000\" gage) and then declare to the control what the distance-to-go shall be (2.0000)."
        }, {
            code: "G52",
            desc: "Local coordinate system (LCS)",
            m: "M",
            t: "",
            info: "Temporarily shifts program zero to a new location. It is simply \"an offset from an offset\", that is, an additional offset added onto the <a href=\"#G54_to_G59\">WCS</a> offset. This simplifies programming in some cases. The typical example is moving from part to part in a multipart setup. With <b>G54</b> active, <b>G52 X140.0 Y170.0</b> shifts program zero 140&nbsp;mm over in X and 170&nbsp;mm over in Y. When the part \"over there\" is done, <b>G52 X0 Y0</b> returns program zero to normal G54 (by reducing G52 offset to nothing). The same result can also be achieved (1) using multiple WCS origins, G54/G55/G56/G57/G58/G59; (2) on newer controls, G54.1 P1/P2/P3/etc. (all the way up to P48); or (3) using <a href=\"#G10\">G10</a> for programmable data input, in which the program can write new offset values to the offset registers. Which method to use depends on shop-specific application."
        }, {
            code: "G53",
            desc: "Machine coordinate system",
            m: "M",
            t: "T",
            info: "Takes absolute coordinates (X,Y,Z,A,B,C) with reference to machine zero rather than program zero. Can be helpful for tool changes. Nonmodal and absolute only. Subsequent blocks are interpreted as \"back to <a href=\"#G54_to_G59\">G54</a>\" even if it is not explicitly programmed."
        }, {
            code: "G54",
            ext: "G54 to G59",
            desc: "Work coordinate systems (WCSs)",
            m: "M",
            t: "T",
            info: "Have largely replaced position register (<a href=\"#G50_position_register\">G50</a> and <a href=\"#G92_position_register\">G92</a>). Each tuple of axis offsets relates program zero directly to machine zero. Standard is 6 tuples (G54 to G59), with optional extensibility to 48 more via G54.1 P1 to P48."
        }, {
            code: "G55",
            ext: "G54 to G59",
            desc: "Work coordinate systems (WCSs)",
            m: "M",
            t: "T",
            info: "Have largely replaced position register (<a href=\"#G50_position_register\">G50</a> and <a href=\"#G92_position_register\">G92</a>). Each tuple of axis offsets relates program zero directly to machine zero. Standard is 6 tuples (G54 to G59), with optional extensibility to 48 more via G54.1 P1 to P48."
        }, {
            code: "G56",
            ext: "G54 to G59",
            desc: "Work coordinate systems (WCSs)",
            m: "M",
            t: "T",
            info: "Have largely replaced position register (<a href=\"#G50_position_register\">G50</a> and <a href=\"#G92_position_register\">G92</a>). Each tuple of axis offsets relates program zero directly to machine zero. Standard is 6 tuples (G54 to G59), with optional extensibility to 48 more via G54.1 P1 to P48."
        }, {
            code: "G57",
            ext: "G54 to G59",
            desc: "Work coordinate systems (WCSs)",
            m: "M",
            t: "T",
            info: "Have largely replaced position register (<a href=\"#G50_position_register\">G50</a> and <a href=\"#G92_position_register\">G92</a>). Each tuple of axis offsets relates program zero directly to machine zero. Standard is 6 tuples (G54 to G59), with optional extensibility to 48 more via G54.1 P1 to P48."
        }, {
            code: "G58",
            ext: "G54 to G59",
            desc: "Work coordinate systems (WCSs)",
            m: "M",
            t: "T",
            info: "Have largely replaced position register (<a href=\"#G50_position_register\">G50</a> and <a href=\"#G92_position_register\">G92</a>). Each tuple of axis offsets relates program zero directly to machine zero. Standard is 6 tuples (G54 to G59), with optional extensibility to 48 more via G54.1 P1 to P48."
        }, {
            code: "G59",
            ext: "G54 to G59",
            desc: "Work coordinate systems (WCSs)",
            m: "M",
            t: "T",
            info: "Have largely replaced position register (<a href=\"#G50_position_register\">G50</a> and <a href=\"#G92_position_register\">G92</a>). Each tuple of axis offsets relates program zero directly to machine zero. Standard is 6 tuples (G54 to G59), with optional extensibility to 48 more via G54.1 P1 to P48."
        }, {
            code: "G54.1",
            ext: "P1 to P48",
            ext: "G54.1 P1 to P48",
            desc: "Extended work coordinate systems",
            m: "M",
            t: "T",
            info: "Up to 48 more WCSs besides the 6 provided as standard by G54 to G59. Note floating-point extension of G-code data type (formerly all integers). Other examples have also evolved (e.g., <a href=\"#G84.2\">G84.2</a>). Modern controls have the <a href=\"/wiki/Computer_hardware\" title=\"Computer hardware\">hardware</a> to handle it."
        }, {
            code: "G61",
            desc: "Exact stop check, modal",
            m: "M",
            t: "T",
            info: "Can be canceled with <a href=\"#G64\">G64</a>. The non-modal version is <a href=\"#G09\">G09</a>."
        }, {
            code: "G62",
            desc: "Automatic corner override",
            m: "M",
            t: "T",
            info: "&nbsp;"
        }, {
            code: "G64",
            desc: "Default cutting mode (cancel exact stop check mode)",
            m: "M",
            t: "T",
            info: "Cancels <a href=\"#G61\">G61</a>."
        }, {
            code: "G70",
            desc: "Fixed cycle, multiple repetitive cycle, for finishing (including contours)",
            m: "",
            t: "T",
            info: "&nbsp;"
        }, {
            code: "G71",
            desc: "Fixed cycle, multiple repetitive cycle, for roughing (Z-axis emphasis)",
            m: "",
            t: "T",
            info: "&nbsp;"
        }, {
            code: "G72",
            desc: "Fixed cycle, multiple repetitive cycle, for roughing (X-axis emphasis)",
            m: "",
            t: "T",
            info: "&nbsp;"
        }, {
            code: "G73",
            ext: "rough_turn_pattern_repeat",
            desc: "Fixed cycle, multiple repetitive cycle, for roughing, with pattern repetition",
            m: "",
            t: "T",
            info: "&nbsp;"
        }, {
            code: "G73 peck",
            ext: "peck drill",
            desc: "Peck drilling cycle for milling – high-speed (NO full retraction from pecks)",
            m: "M",
            t: "",
            info: "Retracts only as far as a clearance increment (system parameter). For when chipbreaking is the main concern, but chip clogging of flutes is not. Compare <a href=\"#G83\">G83</a>."
        }, {
            code: "G74",
            ext: "pecking",
            desc: "Peck drilling cycle for turning",
            m: "",
            t: "T",
            info: "&nbsp;"
        }, {
            code: "G74 tapping",
            desc: "Tapping cycle for milling, <a href=\"/wiki/Screw_thread#Handedness\" title=\"Screw thread\">lefthand thread</a>, <a href=\"#M04\">M04 spindle direction</a>",
            m: "M",
            t: "",
            info: "See notes at <a href=\"#G84\">G84</a>."
        }, {
            code: "G75",
            desc: "Peck grooving cycle for turning",
            m: "",
            t: "T",
            info: "&nbsp;"
        }, {
            code: "G76",
            ext: "bore_on_mill",
            desc: "Fine boring cycle for milling",
            m: "M",
            t: "",
            info: "Includes OSS and shift (oriented spindle stop and shift tool off centerline for retraction)"
        }, {
            code: "G76 thread",
            ext: "thread_on_lathe",
            desc: "Threading cycle for turning, multiple repetitive cycle",
            m: "",
            t: "T",
            info: "&nbsp;"
        }, {
            code: "G80",
            desc: "Cancel canned cycle",
            m: "M",
            t: "T",
            info: "<b>Milling:</b> Cancels all cycles such as <a href=\"#G73_peck_drill\">G73</a>, <a href=\"#G81\">G81</a>, <a href=\"#G83\">G83</a>, etc. Z-axis returns either to Z-initial level or R&nbsp;level, as programmed (<a href=\"#G98_return_to_initial\">G98</a> or <a href=\"#G99_return_to_R_level\">G99</a>, respectively).<br><b>Turning:</b> Usually not needed on lathes, because a new group-1 G address (<a href=\"#G00\">G00</a> to <a href=\"#G03\">G03</a>) cancels whatever cycle was active.\""
        }, {
            code: "G81",
            desc: "Simple drilling cycle",
            m: "M",
            t: "",
            info: "No dwell built in"
        }, {
            code: "G82",
            desc: "Drilling cycle with dwell",
            m: "M",
            t: "",
            info: "Dwells at hole bottom (Z-depth) for the number of <a href=\"/wiki/Millisecond\" title=\"Millisecond\">milliseconds</a> specified by the <a href=\"#P\">P</a> address. Good for when hole bottom finish matters. Good for spot drilling because the divot will be certain to clean up evenly. Consider the \"<a href=\"#Choosing_dwell_duration\">choosing dwell duration</a>\" note at <a href=\"#G04\">G04</a>."
        }, {
            code: "G83",
            desc: "Peck drilling cycle (full retraction from pecks)",
            m: "M",
            t: "",
            info: "Returns to R-level after each peck. Good for clearing flutes of <a href=\"/wiki/Swarf\" title=\"Swarf\">chips</a>. Compare <a href=\"#G73_peck_drill\">G73</a>."
        }, {
            code: "G84",
            desc: "<a href=\"/wiki/Tap_and_die\" title=\"Tap and die\">Tapping</a> cycle, <a href=\"/wiki/Screw_thread#Handedness\" title=\"Screw thread\">righthand thread</a>, <a href=\"#M03\">M03</a> spindle direction",
            m: "M",
            t: "",
            info: "<a href=\"#G74_tapping\">G74</a> and G84 are the righthand and lefthand \"pair\" for old-school tapping with a non-rigid toolholder (\"tapping head\" style). Compare the rigid tapping \"pair\", <a href=\"#G84.2\">G84.2</a> and <a href=\"#G84.3\">G84.3</a>."
        }, {
            code: "G84.2",
            ext: "G84.2",
            desc: "Tapping cycle, <a href=\"/wiki/Screw_thread#Handedness\" title=\"Screw thread\">righthand thread</a>, <a href=\"#M03\">M03</a> spindle direction, rigid toolholder",
            m: "M",
            t: "",
            info: "See notes at <a href=\"#G84\">G84</a>. Rigid tapping synchronizes speed and feed according to the desired thread helix. That is, it synchronizes degrees of spindle rotation with microns of axial travel. Therefore it can use a rigid toolholder to hold the tap. This feature is not available on old machines or newer low-end machines, which must use \"tapping head\" motion (<a href=\"#G74_tapping\">G74</a>/<a href=\"#G84\">G84</a>)."
        }, {
            code: "G84.3",
            ext: "G84.3",
            desc: "Tapping cycle, <a href=\"/wiki/Screw_thread#Handedness\" title=\"Screw thread\">lefthand thread</a>, <a href=\"#M04\">M04</a> spindle direction, rigid toolholder",
            m: "M",
            t: "",
            info: "See notes at <a href=\"#G84\">G84</a> and <a href=\"#G84.2\">G84.2</a>."
        }, {
            code: "G85",
            desc: "boring cycle, feed in/feed out",
            m: "M",
            t: "&nbsp;",
            info: "<ul><li>Good cycle for a reamer.</li><li>In some cases good for single-point boring tool, although in other cases the lack of depth of cut on the way back out is bad for surface finish, in which case, <a href=\"#G76_bore_on_mill\">G76</a> (OSS/shift) can be used instead.</li><li>If need dwell at hole bottom, see <a href=\"#G89\">G89</a>.</li></ul>\""
        }, {
            code: "G86",
            desc: "boring cycle, feed in/spindle stop/rapid out",
            m: "M",
            t: "",
            info: "Boring tool will leave a slight score mark on the way back out. Appropriate cycle for some applications; for others, <a href=\"#G76_bore_on_mill\">G76</a> (OSS/shift) can be used instead."
        }, {
            code: "G87",
            desc: "boring cycle, backboring",
            m: "M",
            t: "",
            info: "For <a href=\"/wiki/Boring_(manufacturing)\" title=\"Boring (manufacturing)\">backboring</a>. Returns to initial level only (<a href=\"#G98_return_to_initial\">G98</a>); this cycle cannot use <a href=\"#G99_return_to_R_level\">G99</a> because its <a href=\"#R\">R level</a> is on the far side of the part, away from the spindle headstock."
        }, {
            code: "G88",
            desc: "boring cycle, feed in/spindle stop/manual operation",
            m: "M",
            t: "",
            info: "&nbsp;"
        }, {
            code: "G89",
            desc: "boring cycle, feed in/dwell/feed out",
            m: "M",
            t: "",
            info: "G89 is like <a href=\"#G85\">G85</a> but with dwell added at bottom of hole."
        }, {
            code: "G90",
            ext: "absolute",
            desc: "Absolute programming",
            m: "M",
            t: "T (B)",
            info: "Positioning defined with reference to part zero.<br><b>Milling:</b> Always as above.<br><b>Turning:</b> Sometimes as above (Fanuc group type B and similarly designed), but on most lathes (Fanuc group type A and similarly designed), G90/G91 are not used for absolute/incremental modes. Instead, <a href=\"#U\">U</a> and <a href=\"#W\">W</a> are the incremental addresses and <a href=\"#X\">X</a> and <a href=\"#Z\">Z</a> are the absolute addresses. On these lathes, G90 is instead a fixed cycle address for roughing."
        }, {
            code: "G90 roughing",
            desc: "Fixed cycle, simple cycle, for roughing (Z-axis emphasis)",
            m: "",
            t: "T (A)",
            info: "When not serving for absolute programming (above)"
        }, {
            code: "G91",
            desc: "Incremental programming",
            m: "M",
            t: "T (B)",
            info: "Positioning defined with reference to previous position.<br><b>Milling:</b> Always as above.<br><b>Turning:</b> Sometimes as above (Fanuc group type B and similarly designed), but on most lathes (Fanuc group type A and similarly designed), G90/G91 are not used for absolute/incremental modes. Instead, <a href=\"#U\">U</a> and <a href=\"#W\">W</a> are the incremental addresses and <a href=\"#X\">X</a> and <a href=\"#Z\">Z</a> are the absolute addresses. On these lathes, G90 is a fixed cycle address for roughing."
        }, {
            code: "G92",
            ext: "position_register",
            desc: "Position register (programming of vector from part zero to tool tip)",
            m: "M",
            t: "T (B)",
            info: "Same corollary info as at <a href=\"#G50_position_register\">G50 position register</a>.<br><b>Milling:</b> Always as above.<br><b>Turning:</b> Sometimes as above (Fanuc group type B and similarly designed), but on most lathes (Fanuc group type A and similarly designed), position register is <a href=\"#G50_position_register\">G50</a>."
        }, {
            code: "G92 threading",
            desc: "Threading cycle, simple cycle",
            m: "",
            t: "T (A)",
            info: "&nbsp;\""
        }, {
            code: "G94",
            ext: "feed_per_minute",
            desc: "Feedrate per minute",
            m: "M",
            t: "T (B)",
            info: "On group type A lathes, feedrate per minute is <a href=\"#G98_feed_per_minute\">G98</a>."
        }, {
            code: "G94 roughing",
            desc: "Fixed cycle, simple cycle, for roughing (<a href=\"#X\">X</a>-axis emphasis)",
            m: "",
            t: "T (A)",
            info: "When not serving for feedrate per minute (above)"
        }, {
            code: "G95",
            ext: "feed_per_rev",
            desc: "Feedrate per revolution",
            m: "M",
            t: "T (B)",
            info: "On group type A lathes, feedrate per revolution is <a href=\"#G99_feed_per_rev\">G99</a>.\""
        }, {
            code: "G96",
            desc: "Constant surface speed (CSS)",
            m: "",
            t: "T",
            info: "Varies spindle speed automatically to achieve a constant surface speed. See <a href=\"/wiki/Speeds_and_feeds\" title=\"Speeds and feeds\">speeds and feeds</a>. Takes an <a href=\"#S\">S</a> address integer, which is interpreted as <a href=\"/wiki/Surface_feet_per_minute\" title=\"Surface feet per minute\">sfm</a> in <a href=\"#G20\">G20</a> mode or as m/min in <a href=\"#G21\">G21</a> mode."
        }, {
            code: "G97",
            desc: "Constant spindle speed",
            m: "M",
            t: "T",
            info: "Takes an S address integer, which is interpreted as rev/min (rpm). The default speed mode per system parameter if no mode is programmed."
        }, {
            code: "G98",
            ext: "return_to_initial",
            desc: "Return to initial Z level in canned cycle",
            m: "M",
            t: "",
            info: "&nbsp;\""
        }, {
            code: "G98 feed",
            ext: "feed_per_minute",
            desc: "Feedrate per minute (group type A)",
            m: "",
            t: "T (A)",
            info: "Feedrate per minute is <a href=\"#G94_feed_per_minute\">G94</a> on group type B."
        }, {
            code: "G99",
            ext: "return_to_R_level",
            desc: "Return to <a href=\"#R\">R level</a> in canned cycle",
            m: "M",
            t: "",
            info: "&nbsp;"
        }, {
            code: "G99 feed",
            ext: "feed_per_rev",
            desc: "Feedrate per revolution (group type A)",
            m: "",
            t: "T (A)",
            info: "Feedrate per revolution is <a href=\"#G95_feed_per_rev\">G95</a> on group type B."
        }, {
            code: "M00",
            ext: "",
            desc: "Compulsory stop",
            m: "M",
            t: "T",
            info: "Non-optional—machine will always stop upon reaching M00 in the program execution."
        }, {
            code: "M01",
            ext: "",
            desc: "Optional stop",
            m: "M",
            t: "T",
            info: "Machine will only stop at M01 if operator has pushed the optional stop button."
        }, {
            code: "M02",
            ext: "",
            desc: "End of program",
            m: "M",
            t: "T",
            info: "Program ends; execution may or may not return to program top (depending on the control); may or may not reset register values. M02 was the original program-end code, now considered obsolete, but still supported for backward compatibility.[4] Many modern controls treat M02 as equivalent to M30.[4] See M30 for additional discussion of control status upon executing M02 or M30."
        }, {
            code: "M03",
            ext: "",
            desc: "Spindle on (clockwise rotation)",
            m: "M",
            t: "T",
            info: "The speed of the spindle is determined by the address S, in either revolutions per minute (G97 mode; default) or surface feet per minute or [surface] meters per minute (G96 mode [CSS] under either G20 or G21). The right-hand rule can be used to determine which direction is clockwise and which direction is counter-clockwise. Right-hand-helix screws moving in the tightening direction (and right-hand-helix flutes spinning in the cutting direction) are defined as moving in the M03 direction, and are labeled \"clockwise\" by convention. The M03 direction is always M03 regardless of local vantage point and local CW/CCW distinction."
        }, {
            code: "M04",
            ext: "",
            desc: "Spindle on (counterclockwise rotation)",
            m: "M",
            t: "T",
            info: "The speed of the spindle is determined by the address S, in either revolutions per minute (G97 mode; default) or surface feet per minute or [surface] meters per minute (G96 mode [CSS] under either G20 or G21). The right-hand rule can be used to determine which direction is clockwise and which direction is counter-clockwise. Right-hand-helix screws moving in the tightening direction (and right-hand-helix flutes spinning in the cutting direction) are defined as moving in the M03 direction, and are labeled \"clockwise\" by convention. The M03 direction is always M03 regardless of local vantage point and local CW/CCW distinction."
        }, {
            code: "M05",
            ext: "",
            desc: "Spindle stop",
            m: "M",
            t: "T",
            info: ""
        }, {
            code: "M06",
            ext: "",
            desc: "Automatic tool change (ATC)",
            m: "M",
            t: "T",
            info: "Many lathes do not use M06 because the T address itself indexes the turret. Programming on any particular machine tool requires knowing which method that machine uses. To understand how the T address works and how it interacts (or not) with M06, one must study the various methods, such as lathe turret programming, ATC fixed tool selection, ATC random memory tool selection, the concept of <i>next tool waiting</i>, and empty tools. These concepts are taught in textbooks such as Smid,[1] and online multimedia (videos, simulators, etc.); all of these teaching resources are usually paywalled to pay back the costs of their development. They are used in training classes for operators, both on-site and remotely (e.g., Tooling University)."
        }, {
            code: "M07",
            ext: "",
            desc: "Coolant on (mist)",
            m: "M",
            t: "T",
            info: ""
        }, {
            code: "M08",
            ext: "",
            desc: "Coolant on (flood)",
            m: "M",
            t: "T",
            info: ""
        }, {
            code: "M09",
            ext: "",
            desc: "Coolant off",
            m: "M",
            t: "T",
            info: ""
        }, {
            code: "M10",
            ext: "",
            desc: "Pallet clamp on",
            m: "M",
            t: "T",
            info: "For machining centers with pallet changers"
        }, {
            code: "M11",
            ext: "",
            desc: "Pallet clamp off",
            m: "M",
            t: "T",
            info: "For machining centers with pallet changers"
        }, {
            code: "M13",
            ext: "",
            desc: "Spindle on (clockwise rotation) and coolant on (flood)",
            m: "M",
            t: "",
            info: "This one M-code does the work of both M03 and M08. It is not unusual for specific machine models to have such combined commands, which make for shorter, more quickly written programs."
        }, {
            code: "M19",
            ext: "",
            desc: "Spindle orientation",
            m: "M",
            t: "T",
            info: "Spindle orientation is more often called within cycles (automatically) or during setup (manually), but it is also available under program control via M19. The abbreviation OSS (oriented spindle stop) may be seen in reference to an oriented stop within cycles."
        }, {
            code: "%",
            ext: "",
            desc: "Start or End of Program",
            m: "M",
            t: "T",
            info: "Demarcates the start and end of a program. Originally indicated the start and end of tape feed on NC machines, generally but not always required to be present on newer machines."
        }, {
            code: "M30",
            ext: "",
            desc: "End of program, with return to program top",
            m: "M",
            t: "T",
            info: "Today M30 is considered the standard program-end code, and will return execution to the top of the program. Today most controls also still support the original program-end code, M02, usually by treating it as equivalent to M30. Additional info: Compare M02 with M30. First, M02 was created, in the days when the punched tape was expected to be short enough to be spliced into a continuous loop (which is why on old controls, M02 triggered no tape rewinding).[6] The other program-end code, M30, was added later to accommodate longer punched tapes, which were wound on a reel and thus needed rewinding before another cycle could start.[6] On many newer controls, there is no longer a difference in how the codes are executed—both act like M30."
        }, {
            code: "M82",
            ext: "",
            desc: "Set extruder to absolute mode",
            m: "M",
            t: "",
            info: "Makes the extruder interpret extrusion as absolute positions. This is the default in repetier.",
            src: "Reprap.org"
        }, {
            code: "M82",
            ext: "",
            desc: "Set extruder to relative mode",
            m: "M",
            t: "",
            info: "Makes the extruder interpret extrusion values as relative positions.",
            src: "Reprap.org"
        }, {
            code: "M84",
            ext: "",
            desc: "Stop idle hold",
            m: "M",
            t: "",
            info: "Stop the idle hold on all axis and extruder. In some cases the idle hold causes annoying noises, which can be stopped by disabling the hold. Be aware that by disabling idle hold during printing, you will get quality issues. This is recommended only in between or after printjobs.",
            src: "Reprap.org"
        }, 

        ],
    }
});