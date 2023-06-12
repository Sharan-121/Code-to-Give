import 'package:fluttertoast/fluttertoast.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:app/sessions.dart';
import 'dart:convert';

Future<String?> translate(String text) async {
  final url = Uri.parse(
      'https://api.mymemory.translated.net/get?q=$text&langpair=en|hi');
  final response = await http.get(
    url,
  );
  if (response.statusCode == 200) {
    String data = response.body;
    return jsonDecode(data)["responseData"]["translatedText"];
  } else {
    return null;
  }
}

Future<String?> loginBeneficiary(int aadharNumber, int phoneNumber) async {
  final url = Uri.parse('http://127.0.0.1:5010/api/v1/login');
  final postData = {"aadharNumber": aadharNumber, "phoneNumber": phoneNumber};
  final response = await http.post(
    url,
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode(postData),
  );
  if (response.statusCode == 200) {
    String data = response.body;
    return data;
  } else {
    return null;
  }
}

class LoginPage extends StatefulWidget {
  final String language;
  const LoginPage(this.language, {super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  TextEditingController aadharController = TextEditingController();
  TextEditingController phoneController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: null,
        body: Container(
          height: MediaQuery.of(context).size.height,
          width: MediaQuery.of(context).size.width,
          decoration: const BoxDecoration(
            image: DecorationImage(
              opacity: 0.75,
              image: AssetImage('assets/login_bg.jpg'),
              fit: BoxFit.cover,
            ),
          ),
          child: Column(
            children: [
              SizedBox(
                height: MediaQuery.of(context).size.height * 0.9,
                width: MediaQuery.of(context).size.width,
                child: Center(
                    child: SingleChildScrollView(
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(bottom: 40),
                        child: SvgPicture.asset(
                          'assets/logo.svg',
                          width: MediaQuery.of(context).size.width * 0.6,
                        ),
                      ),
                      Container(
                        width: MediaQuery.of(context).size.width * 0.95,
                        decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.7),
                            borderRadius: BorderRadius.circular(10),
                            boxShadow: const [
                              BoxShadow(
                                color: Color.fromARGB(127, 0, 0, 0),
                                spreadRadius: 0,
                                blurRadius: 3,
                                offset: Offset(0, 2),
                              )
                            ]),
                        padding: const EdgeInsets.all(8),
                        child: Column(
                          children: [
                            InputField(
                                aadharController,
                                const Icon(Icons.note_alt_sharp),
                                widget.language == "English"
                                    ? "Enter your Aadhar Number"
                                    : "\u0906\u0927\u093e\u0930 \u0938\u0902\u0916\u094d\u092f\u093e \u0926\u0930\u094d\u091c \u0915\u0930\u0947\u0902",
                                widget.language == "English"
                                    ? "Aadhar Number"
                                    : "\u0906\u0927\u093e\u0930 \u0915\u093e\u0930\u094d\u0921 \u0938\u0902\u0916\u094d\u092f\u093e"),
                            InputField(
                                phoneController,
                                const Icon(Icons.phone),
                                widget.language == "English"
                                    ? "Enter your Phone Number"
                                    : "\u0905\u092a\u0928\u093e \u095e\u094b\u0928 \u0928\u0902\u092c\u0930 \u0926\u0930\u094d\u091c \u0915\u0930\u0947\u0902",
                                widget.language == "English"
                                    ? "Phone Number"
                                    : "\u092b\u093c\u094b\u0928 \u0928\u0902\u092c\u0930"),
                            Padding(
                                padding: const EdgeInsets.only(
                                    top: 16.0, bottom: 16),
                                child: SizedBox(
                                  width: 200,
                                  child: ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                      foregroundColor: Colors.white,
                                      backgroundColor: const Color(0xFF1C4E80),
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(8),
                                        side: const BorderSide(
                                          color: Color(0xFF1C4E80),
                                          width: 1.5,
                                        ),
                                      ),
                                      elevation: 0,
                                    ),
                                    onPressed: () async {
                                      String aadhar = aadharController.text;
                                      String phone = phoneController.text;
                                      if (aadhar.trim() == "" ||
                                          phone.trim() == "") {
                                        Fluttertoast.showToast(
                                            msg: widget.language == "English"
                                                ? "Fill all the fields"
                                                : "\u0938\u092d\u0940 \u0915\u094d\u0937\u0947\u0924\u094d\u0930\u094b\u0902 \u0915\u094b \u092d\u0930\u0947\u0902",
                                            toastLength: Toast.LENGTH_SHORT,
                                            gravity: ToastGravity.BOTTOM,
                                            timeInSecForIosWeb: 1,
                                            backgroundColor: Colors.red,
                                            textColor: Colors.white,
                                            fontSize: 16.0);
                                        return;
                                      }
                                      try {
                                        int aadharNumber = int.parse(aadhar
                                            .replaceAll(RegExp(r'\s+'), ''));
                                        int phoneNumber = int.parse(phone
                                            .replaceAll(RegExp(r'\s+'), ''));
                                        String? data = await loginBeneficiary(
                                            aadharNumber, phoneNumber);
                                        if (data == null) {
                                          Fluttertoast.showToast(
                                              msg: widget.language == "English"
                                                  ? "Invalid credentials"
                                                  : "\u0905\u0935\u0948\u0927 \u092a\u094d\u0930\u0924\u094d\u092f\u092f \u092a\u0924\u094d\u0930",
                                              toastLength: Toast.LENGTH_SHORT,
                                              gravity: ToastGravity.BOTTOM,
                                              timeInSecForIosWeb: 1,
                                              backgroundColor: Colors.red,
                                              textColor: Colors.white,
                                              fontSize: 16.0);
                                          return;
                                        } else {
                                          Map tokenData = jsonDecode(data);
                                          Navigator.pushReplacement(
                                            context,
                                            PageRouteBuilder(
                                              transitionDuration:
                                                  const Duration(
                                                      milliseconds: 500),
                                              pageBuilder: (context, animation,
                                                      secondaryAnimation) =>
                                                  SessionsPage(tokenData,
                                                      widget.language),
                                              transitionsBuilder: (context,
                                                  animation,
                                                  secondaryAnimation,
                                                  child) {
                                                var begin =
                                                    const Offset(1.0, 0.0);
                                                var end = Offset.zero;
                                                var curve = Curves.ease;

                                                var tween = Tween(
                                                        begin: begin, end: end)
                                                    .chain(CurveTween(
                                                        curve: curve));

                                                return SlideTransition(
                                                  position:
                                                      animation.drive(tween),
                                                  child: child,
                                                );
                                              },
                                            ),
                                          );
                                        }
                                      } catch (e) {
                                        Fluttertoast.showToast(
                                            msg: widget.language == "English"
                                                ? "Invalid input/inputs"
                                                : "\u0905\u092e\u093e\u0928\u094d\u092f \u0907\u0928\u092a\u0941\u091f/\u0907\u0928\u092a\u0941\u091f",
                                            toastLength: Toast.LENGTH_SHORT,
                                            gravity: ToastGravity.BOTTOM,
                                            timeInSecForIosWeb: 1,
                                            backgroundColor: Colors.red,
                                            textColor: Colors.white,
                                            fontSize: 16.0);
                                        return;
                                      }
                                    },
                                    child: Padding(
                                      padding: const EdgeInsets.all(6.0),
                                      child: Text(
                                          widget.language == "English"
                                              ? "Login"
                                              : "\u0932\u0949\u0917 \u0907\u0928 \u0915\u0930\u0947\u0902",
                                          style: const TextStyle(
                                              fontFamily: 'Montserrat',
                                              fontSize: 15)),
                                    ),
                                  ),
                                )),
                          ],
                        ),
                      ),
                    ],
                  ),
                )),
              ),
              SizedBox(
                  height: MediaQuery.of(context).size.height * 0.1,
                  child: Padding(
                    padding: const EdgeInsets.only(bottom: 10, top: 8),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        ElevatedButton(
                            style: ElevatedButton.styleFrom(
                                foregroundColor: Colors.black,
                                backgroundColor: Colors.transparent,
                                elevation: 0),
                            onPressed: () {
                              if (widget.language == "English") {
                                Navigator.pushReplacement(
                                  context,
                                  PageRouteBuilder(
                                    transitionDuration:
                                        const Duration(milliseconds: 0),
                                    pageBuilder: (context, animation,
                                            secondaryAnimation) =>
                                        const LoginPage(
                                            "\u0939\u093f\u0928\u094d\u0926\u0940"),
                                    transitionsBuilder: (context, animation,
                                        secondaryAnimation, child) {
                                      var begin = const Offset(1.0, 0.0);
                                      var end = Offset.zero;
                                      var curve = Curves.ease;

                                      var tween = Tween(begin: begin, end: end)
                                          .chain(CurveTween(curve: curve));

                                      return SlideTransition(
                                        position: animation.drive(tween),
                                        child: child,
                                      );
                                    },
                                  ),
                                );
                              } else {
                                Navigator.pushReplacement(
                                  context,
                                  PageRouteBuilder(
                                    transitionDuration:
                                        const Duration(milliseconds: 0),
                                    pageBuilder: (context, animation,
                                            secondaryAnimation) =>
                                        const LoginPage("English"),
                                    transitionsBuilder: (context, animation,
                                        secondaryAnimation, child) {
                                      var begin = const Offset(1.0, 0.0);
                                      var end = Offset.zero;
                                      var curve = Curves.ease;

                                      var tween = Tween(begin: begin, end: end)
                                          .chain(CurveTween(curve: curve));

                                      return SlideTransition(
                                        position: animation.drive(tween),
                                        child: child,
                                      );
                                    },
                                  ),
                                );
                              }
                            },
                            child: Text(widget.language,
                                style: const TextStyle(
                                    fontFamily: 'Montserrat',
                                    fontWeight: FontWeight.bold))),
                        const Padding(
                          padding: EdgeInsets.only(right: 16),
                          child: Text(
                            "v1.0.3",
                            style: TextStyle(
                                fontFamily: 'Montserrat',
                                fontWeight: FontWeight.bold),
                          ),
                        )
                      ],
                    ),
                  ))
            ],
          ),
        ));
  }
}

class InputField extends StatefulWidget {
  final TextEditingController controller;
  final Icon icon;
  final String hintText;
  final String labelText;
  const InputField(this.controller, this.icon, this.labelText, this.hintText,
      {super.key});

  @override
  State<InputField> createState() => _InputFieldState();
}

class _InputFieldState extends State<InputField> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(18, 8, 18, 8),
      child: TextField(
        style: const TextStyle(fontFamily: 'Montserrat', color: Colors.black),
        cursorColor: Colors.black,
        controller: widget.controller,
        decoration: InputDecoration(
          icon: widget.icon,
          hintText: widget.labelText,
          labelText: widget.hintText,
          hoverColor: Colors.black,
          focusColor: Colors.black,
          iconColor: Colors.black,
          border:   null,
          labelStyle: const TextStyle(
            fontFamily: 'Montserrat',
            color: Colors.black,
          ),
          focusedBorder: const UnderlineInputBorder(
            borderSide: BorderSide(color: Colors.black),
          ),
          enabledBorder: const UnderlineInputBorder(
            borderSide: BorderSide(color: Colors.black),
          ),
          hintStyle:
              const TextStyle(fontFamily: 'Montserrat', color: Colors.black),
        ),
      ),
    );
  }
}
