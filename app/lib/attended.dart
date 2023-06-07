import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:app/sessions.dart';
import 'package:app/login.dart';
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

const List<Color> colorsList = [
  Color.fromARGB(255, 173, 16, 162),
  Color.fromARGB(255, 228, 115, 23),
  Color.fromARGB(255, 230, 43, 43),
  Color.fromARGB(255, 23, 115, 228),
  Color.fromARGB(255, 92, 254, 70),
  Color.fromARGB(255, 25, 178, 163),
  Color.fromARGB(255, 13, 26, 144),
];

int currentColor = 0;

class AttendedSessionsPage extends StatefulWidget {
  final Map userToken;
  final String language;
  const AttendedSessionsPage(this.userToken, this.language, {super.key});

  @override
  State<AttendedSessionsPage> createState() => _AttendedSessionsPageState();
}

class _AttendedSessionsPageState extends State<AttendedSessionsPage> {
  List<Widget> sessions = [];

  @override
  void initState() {
    super.initState();
    loadSessions();
  }

  void loadSessions() async {
    await translate("What is your name?");
    String? data = await getSessions();
    if (data == null) {
      Fluttertoast.showToast(
          msg: "Login again",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
      return;
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
              0,
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
    }
  }

  Future<String?> getSessions() async {
    final url =
        Uri.parse('http://127.0.0.1:5010/api/v1/beneficiary/sessions/attended');
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
        backgroundColor: Colors.white,
        appBar: AppBar(
          backgroundColor: Colors.white,
          title: Text(
            widget.language == "English"
                ? "Attended Sessions"
                : "सत्रों में भाग लिया",
            style: const TextStyle(
                color: Colors.black, fontSize: 24, fontWeight: FontWeight.bold),
          ),
          actions: [
            ElevatedButton(
                style: ElevatedButton.styleFrom(
                    foregroundColor: Colors.black,
                    backgroundColor: Colors.white,
                    elevation: 0),
                onPressed: () {
                  if (widget.language == "English") {
                    final navigator = Navigator.of(context);
                    navigator.pushReplacement(
                      MaterialPageRoute(
                          builder: (context) => AttendedSessionsPage(
                              widget.userToken,
                              "\u0939\u093f\u0928\u094d\u0926\u0940")),
                    );
                  } else {
                    final navigator = Navigator.of(context);
                    navigator.pushReplacement(
                      MaterialPageRoute(
                          builder: (context) => AttendedSessionsPage(
                              widget.userToken, "English")),
                    );
                  }
                },
                child: Text(widget.language))
          ],
          elevation: 0,
        ),
        body: SingleChildScrollView(
          child: Column(
              children: sessions.isEmpty
                  ? [
                      Padding(
                        padding: const EdgeInsets.all(8),
                        child: Text(
                          widget.language == "English"
                              ? "No attended sessions"
                              : "सत्र में भाग नहीं लिया",
                          style: const TextStyle(
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
            color: Color.fromARGB(255, 31, 198, 217),
          ),
          height: 50,
          width: MediaQuery.of(context).size.width,
          child: Center(
              child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              ElevatedButton(
                  style: ElevatedButton.styleFrom(
                      foregroundColor: Colors.white,
                      backgroundColor: const Color.fromARGB(255, 31, 198, 217),
                      elevation: 0),
                  onPressed: () {
                    final navigator = Navigator.of(context);
                    navigator.pushReplacement(
                      MaterialPageRoute(
                          builder: (context) =>
                              SessionsPage(widget.userToken, widget.language)),
                    );
                  },
                  child: const Icon(Icons.event_note_outlined)),
              ElevatedButton(
                  style: ElevatedButton.styleFrom(
                      foregroundColor: const Color.fromARGB(255, 174, 154, 154),
                      backgroundColor: const Color.fromARGB(255, 31, 198, 217),
                      elevation: 0),
                  onPressed: () {},
                  child: const Icon(Icons.done_all_sharp)),
              ElevatedButton(
                  style: ElevatedButton.styleFrom(
                      foregroundColor: Colors.white,
                      backgroundColor: const Color.fromARGB(255, 31, 198, 217),
                      elevation: 0),
                  onPressed: () {
                    showDialog(
                      context: context,
                      builder: (ctx) => AlertDialog(
                        title: const Text("Logout!"),
                        content: const Text("Are you sure you want to logout?"),
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
                                child: const Text("Cancel"),
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.fromLTRB(5, 0, 5, 0),
                            child: TextButton(
                              onPressed: () {
                                Navigator.of(ctx).pop();
                                final navigator = Navigator.of(context);
                                navigator.pushReplacement(
                                  MaterialPageRoute(
                                      builder: (context) =>
                                          LoginPage(widget.language)),
                                );
                              },
                              child: Container(
                                color: Colors.white,
                                padding: const EdgeInsets.all(14),
                                child: const Text("Logout"),
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
      padding: EdgeInsets.fromLTRB(8, widget.topPadding, 8, 8),
      child: Container(
        decoration: BoxDecoration(
            color: widget.bgColor,
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
              padding: const EdgeInsets.all(8.0),
              child: Text(
                widget.title!,
                style: const TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.w600),
              ),
            ),
            const Padding(
              padding: EdgeInsets.fromLTRB(4, 2, 4, 0),
              child: Divider(
                color: Colors.white,
                height: 1,
                thickness: 1,
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(4.0),
              child: Text(
                widget.description!,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 15,
                ),
              ),
            ),
            Padding(
                padding: const EdgeInsets.all(4.0),
                child: RichText(
                    text: TextSpan(
                  children: [
                    TextSpan(
                      text: widget.category,
                      style: const TextStyle(
                          color: Colors.white,
                          fontSize: 15,
                          fontWeight: FontWeight.w600),
                    ),
                    TextSpan(
                      text:
                          widget.language == "English" ? " category" : " वर्ग",
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 15,
                      ),
                    )
                  ],
                ))),
            const Padding(
              padding: EdgeInsets.fromLTRB(4, 2, 4, 0),
              child: Divider(
                color: Colors.white,
                height: 1,
                thickness: 1,
              ),
            ),
            Padding(
                padding: const EdgeInsets.all(4.0),
                child: RichText(
                    text: TextSpan(
                  children: [
                    TextSpan(
                      text:
                          widget.language == "English" ? "Location: " : "जगह: ",
                      style: const TextStyle(
                          color: Colors.white,
                          fontSize: 15,
                          fontWeight: FontWeight.w600),
                    ),
                    TextSpan(
                      text: widget.location,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 15,
                      ),
                    )
                  ],
                ))),
            Padding(
                padding: const EdgeInsets.all(4.0),
                child: RichText(
                    text: TextSpan(
                  children: [
                    TextSpan(
                      text: widget.language == "English" ? "Date: " : "तारीख: ",
                      style: const TextStyle(
                          color: Colors.white,
                          fontSize: 15,
                          fontWeight: FontWeight.w600),
                    ),
                    TextSpan(
                      text: widget.date,
                      style: const TextStyle(
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
