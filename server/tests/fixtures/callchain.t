/* callchain.t — fixture for call-chain tracing tests */

function functionCall5() { functionCall4(); }
function functionCall4() { functionCall3(); }
function functionCall3() { functionCall2(); }
function functionCall2() { functionCall1(); }
function functionCall1() { }

callTest: object
    method5() { self.method4(); }
    method4() { self.method3(); }
    method3() { self.method2(); }
    method2() { self.method1(); }
    method1() { functionCall5(); }
;


xyzzyRoom: Room
    prop1 = callTest

    method1() {
        "In method1";
    }


    propertyset '*doTake' (dobj) {
        verify() {
            prop1.method5();
        }
        check() {
            prop1.method3();
        }
        action() {
            functionCall3();
        }
    }
;


xyzzyRoom: Room
  method1() {
    "In method1";
  }
;

anotherRoom: Room
    func() {
        xyzzyRoom.method1();
    }
    func2() {
      self.func();
    }
;



// ── Inheritance chain for inherited-call tests ──────────────────────────────

class BaseGreeter: object
    greet() {
        "Hello from BaseGreeter.";
    }
;

class MidGreeter: BaseGreeter
    greet() {
        inherited();
        "Hello from MidGreeter.";
    }
;

class TopGreeter: MidGreeter
    greet() {
        inherited();
        "Hello from TopGreeter.";
    }
;

// TODO: handle macros in some way in call hierarchy or not?
+batteredLantern: Thing 'battered lantern/lamp' 'battered lantern' @shack
  sentinelDobjLight = __objref(LightAction, warn)     
  propertyset '*DobjLight' {
    verify() {}
    check() {
      failCheck('''You can't.''');
    }
  }
;
