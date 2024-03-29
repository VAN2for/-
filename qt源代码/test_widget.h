#ifndef TEST_WIDGET_H
#define TEST_WIDGET_H
#include <QWidget>
#include <QWebEngineView>
#include <QApplication>
#include <QDir>

QT_BEGIN_NAMESPACE
namespace Ui { class Widget; }
QT_END_NAMESPACE

class test_widget : public QWidget
{
    Q_OBJECT
public:
    test_widget();
    ~test_widget();
private slots:
    void Grabwindow();
private:

};
#endif // TEST_WIDGET_H
