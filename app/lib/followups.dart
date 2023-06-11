import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:app/attended.dart';
import 'package:app/loading.dart';
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

Future<bool> updateStatus(
    String sessionId, Map userToken, String language) async {
  final url =
      Uri.parse('http://127.0.0.1:5010/api/v1/beneficiary/sessions/setstatus');
  final postData = {"status": true, "sessionId": sessionId};
  final response = await http.post(
    url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${userToken["token"]}'
    },
    body: jsonEncode(postData),
  );
  if (response.statusCode == 200) {
    Fluttertoast.showToast(
        msg: language == "English" ? "Status updated" : "स्थिति अपडेट की गई",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        timeInSecForIosWeb: 1,
        backgroundColor: Colors.red,
        textColor: Colors.white,
        fontSize: 16.0);
    return true;
  } else {
    Fluttertoast.showToast(
        msg: language == "English" ? "Login again" : "फिर से लॉगिन करें",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        timeInSecForIosWeb: 1,
        backgroundColor: Colors.red,
        textColor: Colors.white,
        fontSize: 16.0);
    return false;
  }
}

class FollowUpPage extends StatefulWidget {
  final Map userToken;
  final String language;
  final Map session;
  const FollowUpPage(this.userToken, this.language, this.session, {super.key});

  @override
  State<FollowUpPage> createState() => _FollowUpPageState();
}

class _FollowUpPageState extends State<FollowUpPage> {
  bool isLoading = true;
  Map data = {};

  @override
  void initState() {
    super.initState();
    loadSession().then((_) {
      setState(() {
        isLoading = false;
      });
    });
  }

  Future<int> loadSession() async {
    data["name"] = widget.language == "English"
        ? widget.session["name"]
        : await translate(widget.session["name"]);
    data["description"] = widget.language == "English"
        ? widget.session["description"]
        : await translate(widget.session["description"]);
    data["category"] = widget.language == "English"
        ? widget.session["category"]
        : await translate(widget.session["category"]);
    data["location"] = widget.language == "English"
        ? widget.session["location"]
        : await translate(widget.session["location"]);
    data["date"] = widget.session["date"];
    data["followUp"] = widget.language == "English"
        ? widget.session["followUp"]
        : await translate(widget.session["followUp"]);
    data["status"] = widget.session["status"];
    return 1;
  }

  @override
  Widget build(BuildContext context) {
    final appBarHeight = AppBar().preferredSize.height;
    final screenHeight = MediaQuery.of(context).size.height;
    final containerHeight = screenHeight - appBarHeight;

    return Scaffold(
        backgroundColor: const Color.fromRGBO(235, 235, 235, 1),
        appBar: AppBar(
          backgroundColor: const Color(0xFF1C4E80),
          leading: IconButton(
            icon: const Icon(Icons.arrow_back_sharp),
            color: const Color.fromRGBO(235, 235, 235, 1),
            onPressed: () {
              Navigator.pushReplacement(
                context,
                PageRouteBuilder(
                  transitionDuration: const Duration(milliseconds: 500),
                  pageBuilder: (context, animation, secondaryAnimation) =>
                      AttendedSessionsPage(widget.userToken, widget.language),
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
          ),
          actions: [
            ElevatedButton(
                style: ElevatedButton.styleFrom(
                    foregroundColor: const Color.fromRGBO(235, 235, 235, 1),
                    backgroundColor: const Color(0xFF1C4E80),
                    elevation: 0),
                onPressed: () {
                  if (widget.language == "English") {
                    Navigator.pushReplacement(
                      context,
                      PageRouteBuilder(
                        transitionDuration: const Duration(milliseconds: 0),
                        pageBuilder: (context, animation, secondaryAnimation) =>
                            FollowUpPage(
                                widget.userToken,
                                "\u0939\u093f\u0928\u094d\u0926\u0940",
                                widget.session),
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
                            FollowUpPage(
                                widget.userToken, "English", widget.session),
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
                child: Text(
                  widget.language,
                  style: const TextStyle(fontFamily: 'Montserrat'),
                ))
          ],
          elevation: 0,
        ),
        body: isLoading
            ? const LoadingView()
            : SingleChildScrollView(
                child: Session(
                    widget.session,
                    containerHeight,
                    widget.session["sessionId"],
                    widget.userToken,
                    widget.language,
                    10,
                    const Color.fromRGBO(235, 235, 235, 1),
                    data["name"],
                    data["description"],
                    data["category"],
                    data["location"],
                    data["date"],
                    data["followUp"],
                    data["status"])));
  }
}

final ButtonStyle flatButtonStyle = TextButton.styleFrom(
  minimumSize: const Size(0, 0),
  padding: const EdgeInsets.all(0),
);

class Session extends StatefulWidget {
  final Map session;
  final double height;
  final String sessionId;
  final Map userToken;
  final String language;
  final double topPadding;
  final Color bgColor;
  final String? title;
  final String? description;
  final String? category;
  final String? location;
  final String date;
  final String followUp;
  bool status;
  Session(
      this.session,
      this.height,
      this.sessionId,
      this.userToken,
      this.language,
      this.topPadding,
      this.bgColor,
      this.title,
      this.description,
      this.category,
      this.location,
      this.date,
      this.followUp,
      this.status,
      {super.key});

  @override
  State<Session> createState() => _SessionState();
}

class _SessionState extends State<Session> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.fromLTRB(3, widget.topPadding, 3, 8),
      child: Container(
        height: widget.height - 18,
        decoration: BoxDecoration(
          color: widget.bgColor,
          borderRadius: BorderRadius.circular(10),
        ),
        width: MediaQuery.of(context).size.width - 6,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(5, 2, 4, 7),
                  child: Text(
                    widget.title!,
                    style: const TextStyle(
                        fontFamily: 'Montserrat',
                        color: Colors.black,
                        fontSize: 23,
                        fontWeight: FontWeight.w600),
                  ),
                ),
                const Padding(
                  padding: EdgeInsets.fromLTRB(4, 2, 4, 0),
                  child: Divider(
                    color: Color.fromARGB(255, 160, 151, 151),
                    height: 1,
                    thickness: 1,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(4, 10, 4, 4),
                  child: Text(
                    widget.description!,
                    style: const TextStyle(
                      fontFamily: 'Montserrat',
                      color: Colors.black,
                      fontSize: 16,
                    ),
                  ),
                ),
                Padding(
                    padding: const EdgeInsets.fromLTRB(4, 8, 4, 4),
                    child: RichText(
                        text: TextSpan(
                      children: [
                        TextSpan(
                          text: widget.category,
                          style: const TextStyle(
                              fontFamily: 'Montserrat',
                              color: Colors.black,
                              fontSize: 16,
                              fontWeight: FontWeight.w600),
                        ),
                        TextSpan(
                          text: widget.language == "English"
                              ? " category"
                              : " वर्ग",
                          style: const TextStyle(
                            fontFamily: 'Montserrat',
                            color: Colors.black,
                            fontSize: 16,
                          ),
                        )
                      ],
                    ))),
                Padding(
                    padding: const EdgeInsets.fromLTRB(4, 8, 4, 4),
                    child: RichText(
                        text: TextSpan(
                      children: [
                        TextSpan(
                          text: widget.language == "English"
                              ? "Location: "
                              : "जगह: ",
                          style: const TextStyle(
                              fontFamily: 'Montserrat',
                              color: Colors.black,
                              fontSize: 16,
                              fontWeight: FontWeight.w600),
                        ),
                        TextSpan(
                          text: widget.location,
                          style: const TextStyle(
                            fontFamily: 'Montserrat',
                            color: Colors.black,
                            fontSize: 16,
                          ),
                        )
                      ],
                    ))),
                Padding(
                    padding: const EdgeInsets.fromLTRB(4, 8, 4, 10),
                    child: RichText(
                        text: TextSpan(
                      children: [
                        TextSpan(
                          text: widget.language == "English"
                              ? "Date: "
                              : "तारीख: ",
                          style: const TextStyle(
                              fontFamily: 'Montserrat',
                              color: Colors.black,
                              fontSize: 16,
                              fontWeight: FontWeight.w600),
                        ),
                        TextSpan(
                          text: widget.date,
                          style: const TextStyle(
                            fontFamily: 'Montserrat',
                            color: Colors.black,
                            fontSize: 16,
                          ),
                        )
                      ],
                    ))),
                const Padding(
                  padding: EdgeInsets.fromLTRB(4, 2, 4, 0),
                  child: Divider(
                    color: Color.fromARGB(255, 160, 151, 151),
                    height: 1,
                    thickness: 1,
                  ),
                ),
                Padding(
                    padding: const EdgeInsets.fromLTRB(4, 12, 4, 4),
                    child: Text(
                      widget.language == "English" ? "Mission:" : "उद्देश्य:",
                      style: const TextStyle(
                          fontFamily: 'Montserrat',
                          fontSize: 19,
                          fontWeight: FontWeight.bold),
                    )),
                Padding(
                    padding: const EdgeInsets.all(4),
                    child: Text(
                      widget.followUp,
                      style: const TextStyle(
                          fontFamily: 'Montserrat', fontSize: 16),
                    )),
              ],
            ),
            widget.status
                ? CompletedContainer(widget.language)
                : CompletedButton(
                    widget.language, widget.session, widget.userToken),
          ],
        ),
      ),
    );
  }
}

class CompletedButton extends StatefulWidget {
  final String language;
  final Map session;
  final Map userToken;
  const CompletedButton(this.language, this.session, this.userToken,
      {super.key});

  @override
  State<CompletedButton> createState() => _CompletedButtonState();
}

class _CompletedButtonState extends State<CompletedButton> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(4.5, 0, 4.5, 0),
      child: ElevatedButton(
          style: ElevatedButton.styleFrom(
              foregroundColor: const Color.fromRGBO(235, 235, 235, 1),
              backgroundColor: const Color(0xFF1C4E80),
              elevation: 0),
          onPressed: () {
            showDialog(
              context: context,
              builder: (ctx) => AlertDialog(
                title: Text(
                    widget.language == "English" ? "Confirm!" : "पुष्टि करना!"),
                content: Text(
                    widget.language == "English"
                        ? "Are you sure you have completed the mission?"
                        : "क्या आप सुनिश्चित हैं कि आपने मिशन पूरा कर लिया है?",
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
                        child:
                            Text(widget.language == "English" ? "No" : "नहीं",
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
                      onPressed: () async {
                        bool result = await updateStatus(
                            widget.session["sessionId"],
                            widget.userToken,
                            widget.language);
                        if (result) {
                          widget.session["status"] = true;
                        }
                        Navigator.of(ctx).pop();
                        Navigator.pushReplacement(
                          context,
                          PageRouteBuilder(
                            transitionDuration: const Duration(milliseconds: 0),
                            pageBuilder: (context, animation,
                                    secondaryAnimation) =>
                                FollowUpPage(widget.userToken, widget.language,
                                    widget.session),
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
                                ? "Completed!"
                                : "पूरित!",
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
          child: Padding(
            padding: const EdgeInsets.all(7.0),
            child: Text(
              widget.language == "English" ? "Completed" : "पूरित",
              style: const TextStyle(
                fontSize: 16,
                fontFamily: 'Montserrat',
              ),
            ),
          )),
    );
  }
}

class CompletedContainer extends StatefulWidget {
  final String language;
  const CompletedContainer(this.language, {super.key});

  @override
  State<CompletedContainer> createState() => _CompletedContainerState();
}

class _CompletedContainerState extends State<CompletedContainer> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(4.5, 0, 4.5, 0),
      child: Container(
        decoration: BoxDecoration(
          color: const Color.fromARGB(255, 59, 114, 168),
          borderRadius: BorderRadius.circular(4),
        ),
        alignment: Alignment.center,
        child: Padding(
          padding: const EdgeInsets.all(7.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Icon(
                Icons.check_sharp,
                color: Color.fromARGB(255, 204, 200, 200),
              ),
              Text(
                widget.language == "English" ? "Completed" : "पूरित",
                style: const TextStyle(
                    fontFamily: 'Montserrat',
                    fontSize: 16,
                    color: Color.fromARGB(255, 204, 200, 200),
                    fontWeight: FontWeight.w600),
              ),
              const Icon(null),
            ],
          ),
        ),
      ),
    );
  }
}
