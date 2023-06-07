import 'package:fluttertoast/fluttertoast.dart';
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
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: ElevatedButton(
            style: ElevatedButton.styleFrom(
                foregroundColor: Colors.black,
                backgroundColor: Colors.white,
                elevation: 0),
            onPressed: () {
              if (widget.language == "English") {
                final navigator = Navigator.of(context);
                navigator.pushReplacement(
                  MaterialPageRoute(
                      builder: (context) => const LoginPage(
                          "\u0939\u093f\u0928\u094d\u0926\u0940")),
                );
              } else {
                final navigator = Navigator.of(context);
                navigator.pushReplacement(
                  MaterialPageRoute(
                      builder: (context) => const LoginPage("English")),
                );
              }
            },
            child: Text(widget.language)),
        elevation: 0,
      ),
      body: Center(
          child: SingleChildScrollView(
        child: Column(
          children: [
            InputField(
                aadharController,
                widget.language == "English"
                    ? "Enter your Aadhar Number"
                    : "\u0906\u0927\u093e\u0930 \u0938\u0902\u0916\u094d\u092f\u093e \u0926\u0930\u094d\u091c \u0915\u0930\u0947\u0902",
                widget.language == "English"
                    ? "Aadhar Number"
                    : "\u0906\u0927\u093e\u0930 \u0915\u093e\u0930\u094d\u0921 \u0938\u0902\u0916\u094d\u092f\u093e"),
            InputField(
                phoneController,
                widget.language == "English"
                    ? "Enter your Phone Number"
                    : "\u0905\u092a\u0928\u093e \u095e\u094b\u0928 \u0928\u0902\u092c\u0930 \u0926\u0930\u094d\u091c \u0915\u0930\u0947\u0902",
                widget.language == "English"
                    ? "Phone Number"
                    : "\u092b\u093c\u094b\u0928 \u0928\u0902\u092c\u0930"),
            Padding(
                padding: const EdgeInsets.only(top: 16.0),
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    foregroundColor: Colors.white,
                    backgroundColor: Colors.blue,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                    elevation: 5,
                  ),
                  onPressed: () async {
                    String aadhar = aadharController.text;
                    String phone = phoneController.text;
                    if (aadhar.trim() == "" || phone.trim() == "") {
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
                      int aadharNumber =
                          int.parse(aadhar.replaceAll(RegExp(r'\s+'), ''));
                      int phoneNumber =
                          int.parse(phone.replaceAll(RegExp(r'\s+'), ''));
                      String? data =
                          await loginBeneficiary(aadharNumber, phoneNumber);
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
                        final navigator = Navigator.of(context);
                        navigator.pushReplacement(
                          MaterialPageRoute(
                            builder: (context) =>
                                SessionsPage(tokenData, widget.language),
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
                        style: const TextStyle(fontSize: 15)),
                  ),
                ))
          ],
        ),
      )),
    );
  }
}

class InputField extends StatefulWidget {
  final TextEditingController controller;
  final String hintText;
  final String labelText;
  const InputField(this.controller, this.labelText, this.hintText, {super.key});

  @override
  State<InputField> createState() => _InputFieldState();
}

class _InputFieldState extends State<InputField> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(18, 8, 18, 8),
      child: TextField(
        controller: widget.controller,
        decoration: InputDecoration(
          hintText: widget.labelText,
          labelText: widget.hintText,
          border: null,
        ),
      ),
    );
  }
}
