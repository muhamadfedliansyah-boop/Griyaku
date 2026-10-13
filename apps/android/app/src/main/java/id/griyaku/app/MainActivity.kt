package id.griyaku.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import id.griyaku.app.core.designsystem.theme.GriyakuColors
import id.griyaku.app.core.designsystem.theme.GriyakuTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            GriyakuTheme {
                Scaffold(
                    modifier = Modifier.fillMaxSize(),
                    containerColor = GriyakuColors.Canvas
                ) { innerPadding ->
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(innerPadding)
                            .background(GriyakuColors.Brand500),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = "Griyaku Marketplace",
                            color = Color.White,
                            fontSize = 24.sp
                        )
                    }
                }
            }
        }
    }
}
