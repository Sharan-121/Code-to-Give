import 'package:app/scanner.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:app/attended.dart';
import 'dart:convert';
import 'loading.dart';
import 'login.dart';

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

const List<Color> colorsList = [
  Colors.white,
];

int currentColor = 0;

class SessionsPage extends StatefulWidget {
  final Map userToken;
  final String language;
  const SessionsPage(this.userToken, this.language, {super.key});

  @override
  State<SessionsPage> createState() => _SessionsPageState();
}

class _SessionsPageState extends State<SessionsPage> {
  List<Widget> sessions = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    loadSessions().then((_) {
      setState(() {
        isLoading = false;
      });
    });
  }

  Future<int> loadSessions() async {
    String? data = await getSessions();
    if (data == null) {
      Fluttertoast.showToast(
          msg: widget.language == "English"
              ? "Login again"
              : "फिर से लॉगिन करें",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
      return 1;
    } else {
      List sessionsList = jsonDecode(data)["sessions"];
      List<Widget> tempSessions = [];
      for (Map session in sessionsList) {
        if (tempSessions.isEmpty) {
          tempSessions.add(Session(
              widget.language,
              5,
              colorsList[currentColor % colorsList.length],
              widget.language == "English"
                  ? session["name"]
                  : await translate(session["name"]),
              widget.language == "English"
                  ? session["description"]
                  : await translate(session["description"]),
              widget.language == "English"
                  ? session["category"]
                  : await translate(session["category"]),
              widget.language == "English"
                  ? session["location"]
                  : await translate(session["location"]),
              session["date"]));
          ++currentColor;
        } else {
          tempSessions.add(Session(
              widget.language,
              5,
              colorsList[currentColor % colorsList.length],
              widget.language == "English"
                  ? session["name"]
                  : await translate(session["name"]),
              widget.language == "English"
                  ? session["description"]
                  : await translate(session["description"]),
              widget.language == "English"
                  ? session["category"]
                  : await translate(session["category"]),
              widget.language == "English"
                  ? session["location"]
                  : await translate(session["location"]),
              session["date"]));
          ++currentColor;
        }
      }
      setState(() {
        sessions = tempSessions;
      });
      return 1;
    }
  }

  Future<String?> getSessions() async {
    final url = Uri.parse(
        'http://127.0.0.1:5010/api/v1/beneficiary/sessions/available');
    final response = await http.get(
      url,
      headers: {'Authorization': 'Bearer ${widget.userToken["token"]}'},
    );
    if (response.statusCode == 200) {
      String data = response.body;
      return data;
    } else {
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color.fromRGBO(235, 235, 235, 1),
        appBar: AppBar(
          backgroundColor: const Color.fromRGBO(235, 235, 235, 1),
          title: Text(
            widget.language == "English" ? "Upcoming Sessions" : "उपलब्ध सत्र",
            style: const TextStyle(
                fontFamily: 'Montserrat',
                color: Colors.black,
                fontSize: 24,
                fontWeight: FontWeight.bold),
          ),
          actions: [
            ElevatedButton(
                style: ElevatedButton.styleFrom(
                    foregroundColor: Colors.black,
                    backgroundColor: const Color.fromRGBO(235, 235, 235, 1),
                    elevation: 0),
                onPressed: () {
                  if (widget.language == "English") {
                    Navigator.pushReplacement(
                      context,
                      PageRouteBuilder(
                        transitionDuration: const Duration(milliseconds: 0),
                        pageBuilder: (context, animation, secondaryAnimation) =>
                            SessionsPage(widget.userToken,
                                "\u0939\u093f\u0928\u094d\u0926\u0940"),
                        transitionsBuilder:
                            (context, animation, secondaryAnimation, child) {
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
                        transitionDuration: const Duration(milliseconds: 0),
                        pageBuilder: (context, animation, secondaryAnimation) =>
                            SessionsPage(widget.userToken, "English"),
                        transitionsBuilder:
                            (context, animation, secondaryAnimation, child) {
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
                    )))
          ],
          elevation: 0,
        ),
        body: isLoading
            ? const LoadingView()
            : SingleChildScrollView(
                child: Column(
                    children: sessions.isEmpty
                        ? [
                            Padding(
                              padding: const EdgeInsets.all(8),
                              child: Text(
                                widget.language == "English"
                                    ? "No upcoming sessions"
                                    : "कोई आगामी सत्र नहीं",
                                style: const TextStyle(
                                    fontFamily: 'Montserrat',
                                    color: Colors.red,
                                    fontSize: 20,
                                    fontWeight: FontWeight.w500),
                              ),
                            )
                          ]
                        : sessions),
              ),
        bottomNavigationBar: Container(
          decoration: const BoxDecoration(
            color: Color(0xFF1C4E80),
          ),
          height: 50,
          width: MediaQuery.of(context).size.width,
          child: Center(
              child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              ElevatedButton(
                  style: ElevatedButton.styleFrom(
                      foregroundColor: const Color.fromARGB(255, 174, 154, 154),
                      backgroundColor: const Color(0xFF1C4E80),
                      elevation: 0),
                  onPressed: () {},
                  child: const Icon(Icons.event_note_outlined)),
              ElevatedButton(
                  style: ElevatedButton.styleFrom(
                      foregroundColor: Colors.white,
                      backgroundColor: const Color(0xFF1C4E80),
                      elevation: 0),
                  onPressed: () {
                    Navigator.pushReplacement(
                      context,
                      PageRouteBuilder(
                        transitionDuration: const Duration(milliseconds: 0),
                        pageBuilder: (context, animation, secondaryAnimation) =>
                            AttendedSessionsPage(
                                widget.userToken, widget.language),
                        transitionsBuilder:
                            (context, animation, secondaryAnimation, child) {
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
                  },
                  child: const Icon(Icons.done_all_sharp)),
              ElevatedButton(
                  style: ElevatedButton.styleFrom(
                      foregroundColor: Colors.white,
                      backgroundColor: const Color(0xFF1C4E80),
                      elevation: 0),
                  onPressed: () {
                    Navigator.pushReplacement(
                      context,
                      PageRouteBuilder(
                        transitionDuration: const Duration(milliseconds: 0),
                        pageBuilder: (context, animation, secondaryAnimation) =>
                            QRCodeScannerPage(
                          widget.userToken,
                          widget.language,
                        ),
                        transitionsBuilder:
                            (context, animation, secondaryAnimation, child) {
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
                  },
                  child: const Icon(Icons.qr_code_scanner_sharp)),
              ElevatedButton(
                  style: ElevatedButton.styleFrom(
                      foregroundColor: Colors.white,
                      backgroundColor: const Color(0xFF1C4E80),
                      elevation: 0),
                  onPressed: () {
                    showDialog(
                      context: context,
                      builder: (ctx) => AlertDialog(
                        title: Text(
                            widget.language == "English"
                                ? "Logout!"
                                : "उच्चारण!",
                            style: const TextStyle(
                              fontFamily: 'Montserrat',
                            )),
                        content: Text(
                            widget.language == "English"
                                ? "Are you sure you want to logout?"
                                : "क्या आप उच्चारण करना चाहते हैं?",
                            style: const TextStyle(
                              fontFamily: 'Montserrat',
                            )),
                        actions: <Widget>[
                          Padding(
                            padding: const EdgeInsets.fromLTRB(5, 0, 5, 0),
                            child: TextButton(
                              onPressed: () {
                                Navigator.of(ctx).pop();
                              },
                              child: Container(
                                color: Colors.white,
                                padding: const EdgeInsets.all(14),
                                child: Text(
                                    widget.language == "English"
                                        ? "Cancel"
                                        : "रद्द करना",
                                    style: const TextStyle(
                                      color: Color(0xFF1C4E80),
                                      fontFamily: 'Montserrat',
                                    )),
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.fromLTRB(5, 0, 5, 0),
                            child: TextButton(
                              onPressed: () {
                                Navigator.of(ctx).pop();
                                Navigator.pushReplacement(
                                  context,
                                  PageRouteBuilder(
                                    transitionDuration:
                                        const Duration(milliseconds: 500),
                                    pageBuilder: (context, animation,
                                            secondaryAnimation) =>
                                        LoginPage(widget.language),
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
                              },
                              child: Container(
                                color: const Color(0xFF1C4E80),
                                padding: const EdgeInsets.all(14),
                                child: Text(
                                    widget.language == "English"
                                        ? "Logout!"
                                        : "उच्चारण!",
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontFamily: 'Montserrat',
                                    )),
                              ),
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                  child: const Icon(Icons.logout_sharp)),
            ],
          )),
        ));
  }
}

class Session extends StatefulWidget {
  final String language;
  final double topPadding;
  final Color bgColor;
  final String? title;
  final String? description;
  final String? category;
  final String? location;
  final String date;
  const Session(this.language, this.topPadding, this.bgColor, this.title,
      this.description, this.category, this.location, this.date,
      {super.key});

  @override
  State<Session> createState() => _SessionState();
}

class _SessionState extends State<Session> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.fromLTRB(12, widget.topPadding, 12, 12),
      child: Container(
        decoration: BoxDecoration(
            color: const Color(0xFF4F7CAE),
            borderRadius: BorderRadius.circular(10),
            boxShadow: const [
              BoxShadow(
                color: Color.fromARGB(127, 0, 0, 0),
                spreadRadius: 0,
                blurRadius: 3,
                offset: Offset(0, 2),
              )
            ]),
        width: MediaQuery.of(context).size.width - 16,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(10, 12, 10, 8),
              child: Text(
                widget.title!,
                style: const TextStyle(
                    fontFamily: 'Montserrat',
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.w600),
              ),
            ),
            const Padding(
              padding: EdgeInsets.fromLTRB(8, 2, 8, 0),
              child: Divider(
                color: Colors.white,
                height: 1,
                thickness: 1,
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                widget.description!,
                style: const TextStyle(
                  fontFamily: 'Montserrat',
                  color: Colors.white,
                  fontSize: 15,
                ),
              ),
            ),
            Padding(
                padding: const EdgeInsets.all(8.0),
                child: RichText(
                    text: TextSpan(
                  children: [
                    TextSpan(
                      text: widget.category,
                      style: const TextStyle(
                          fontFamily: 'Montserrat',
                          color: Colors.white,
                          fontSize: 15,
                          fontWeight: FontWeight.w600),
                    ),
                    TextSpan(
                      text:
                          widget.language == "English" ? " category" : " वर्ग",
                      style: const TextStyle(
                        fontFamily: 'Montserrat',
                        color: Colors.white,
                        fontSize: 15,
                      ),
                    )
                  ],
                ))),
            const Padding(
              padding: EdgeInsets.fromLTRB(8, 2, 8, 0),
              child: Divider(
                color: Colors.white,
                height: 1,
                thickness: 1,
              ),
            ),
            Padding(
                padding: const EdgeInsets.all(8.0),
                child: RichText(
                    text: TextSpan(
                  children: [
                    TextSpan(
                      text:
                          widget.language == "English" ? "Location: " : "जगह: ",
                      style: const TextStyle(
                          fontFamily: 'Montserrat',
                          color: Colors.white,
                          fontSize: 15,
                          fontWeight: FontWeight.w600),
                    ),
                    TextSpan(
                      text: widget.location,
                      style: const TextStyle(
                        fontFamily: 'Montserrat',
                        color: Colors.white,
                        fontSize: 15,
                      ),
                    )
                  ],
                ))),
            Padding(
                padding: const EdgeInsets.fromLTRB(8, 8, 8, 12),
                child: RichText(
                    text: TextSpan(
                  children: [
                    TextSpan(
                      text: widget.language == "English" ? "Date: " : "तारीख: ",
                      style: const TextStyle(
                          fontFamily: 'Montserrat',
                          color: Colors.white,
                          fontSize: 15,
                          fontWeight: FontWeight.w600),
                    ),
                    TextSpan(
                      text: widget.date,
                      style: const TextStyle(
                        fontFamily: 'Montserrat',
                        color: Colors.white,
                        fontSize: 15,
                      ),
                    )
                  ],
                ))),
          ],
        ),
      ),
    );
  }
}
